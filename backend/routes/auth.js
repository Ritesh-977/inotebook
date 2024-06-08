const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'ramgram$07';

//ROUTE 1:  Create a user using POST
router.post('/createuser',[
    body('Name','Enter a valid Name').isLength({min: 3}),
    body('Email', 'Enter a valid Email').isEmail(),
    body('Password', 'Enter a valid Password').isLength({min: 6}),
], async (req, res)=>{
    // Check errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    try{
        const salt =  bcrypt.genSaltSync(10);
        const secPassword =  bcrypt.hashSync(req.body.Password,salt);

    // Check if email already exits
    let user = await Users.findOne({Email: req.body.Email})
    if(user){
        return res.status(400).json({error: 'Email already exits'})
    }
    user = await Users.create({
        Name: req.body.Name,
        Password: secPassword,
        Email: req.body.Email,
    })
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})
}
catch(error){
    console.error(error.message)
    res.status(500).send("Internal Server error ")     
}
})


//ROUTE 2: Authenticate a user using POST
router.post('/login',[
    body('Email', 'Enter a valid Email').isEmail(),
    body('Password', 'Passwords cannot be blank').exists(),
], async (req, res)=>{

    // Check errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
   }

   const {Email, Password} = req.body; 
   try {
        let user = await Users.findOne({Email});
        //Check email
            if(!user){
                return res.status(400).json({error:"Incorrect credentials"});
            }
        //Check Password
             const passwordCompare =  bcrypt.compareSync(Password, user.Password);
            if(!passwordCompare){
                return res.status(400).json({error:"Incorrect credentials"});
            }

            const data = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({authtoken})

   } catch(error){
    console.error(error.message)
    res.status(500).send("Internal Server Error ");
}

})


//ROUTE 3: Get Loggedin Users Detail using POST
router.post('/getuser', fetchuser,  async (req, res) => {
    try {
        
      const userId = req.user.id;
      const user = await Users.findById(userId).select("-Password")
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
module.exports = router
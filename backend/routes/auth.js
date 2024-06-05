const bcrypt = require('bcryptjs')
const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const {  validationResult } = require('express-validator');
const {body} = require('express-validator');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ramgram07';

// Create a user using POST
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
    // Check if email already exits
    try{
        const salt =  bcrypt.genSaltSync(10);
        const secPassword = await bcrypt.hash(req.body.Password,salt);
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
    res.status(500).send("Some error occured")
}
})


module.exports = router
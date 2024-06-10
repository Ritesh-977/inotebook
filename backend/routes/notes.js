const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Fetch Note using GET
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes); 
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error ")
    }

});


// Route 2: ADD a Note using POST
router.post( "/addnotes", fetchuser,[
    body("title", "Enter a valid Name").isLength({ min: 3 }),
    body("description", "Enter a valid Password").isLength({ min: 5 }),
  ], async (req, res) => {
    // Check errors
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server error ") 
    }
  }
);

// Route 3: Update an  existing Note using PUT
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        

    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    let note = await Notes.findById(req.params.id)
    if(!note){ 
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Alowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json(note);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error ") 
    }   
});


// Route 4: Delete an  existing Note using DELETE
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
    try {

    let note = await Notes.findById(req.params.id)
    if(!note){ 
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Alowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted", note: note});
           
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error ") 
    }

});
module.exports = router;

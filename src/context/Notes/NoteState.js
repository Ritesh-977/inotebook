import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteinitial = [];
  const [notes, setNotes] = useState(noteinitial);
 // Get all Notes
 const getNotes = async () => {
  //API
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authtoken": localStorage.getItem('token')
    }
  });
  const json = await response.json();
  setNotes(json);
 
};

  // Add a Note
  const addNote = async (title, description, tag) => {
    //API
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));

  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem('token')
      }
    });
     // eslint-disable-next-line
    const json = await response.json();
    
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description,tag})
    });
     // eslint-disable-next-line
    const json = await response.json();
    
    getNotes();

  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote , getNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

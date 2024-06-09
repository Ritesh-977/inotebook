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
      authtoken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MWQ4MzNiNzZhZjM5NzgzYWM1YjcyIn0sImlhdCI6MTcxNzc1MzI2OH0.JJlxD1xIVSgMYVbiivx9VpX0FO0NetVATJxZZfItqJA",
    }
  });
  const json = await response.json();
  console.log(json)
  setNotes(json);
 
};

  // Add a Note
  const addNote = async (title, description, tag) => {
    //API
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MWQ4MzNiNzZhZjM5NzgzYWM1YjcyIn0sImlhdCI6MTcxNzc1MzI2OH0.JJlxD1xIVSgMYVbiivx9VpX0FO0NetVATJxZZfItqJA",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    console.log("Adding a note");
    const note = {
      _id: "66643f66427798a75264ad75",
      user: "6661d833b76af39783ac5b72",
      title: title,
      description: description,
      tag: tag,
      Date: "2024-06-08T11:24:22.130Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MWQ4MzNiNzZhZjM5NzgzYWM1YjcyIn0sImlhdCI6MTcxNzc1MzI2OH0.JJlxD1xIVSgMYVbiivx9VpX0FO0NetVATJxZZfItqJA",
      }
    });
    const json = await response.json();
    console.log(json)
    console.log("Deleting a note with id " + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MWQ4MzNiNzZhZjM5NzgzYWM1YjcyIn0sImlhdCI6MTcxNzc1MzI2OH0.JJlxD1xIVSgMYVbiivx9VpX0FO0NetVATJxZZfItqJA",
      },
      body: JSON.stringify({title, description,tag}),
    });
    const json = await response.json();
    console.log(json)
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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

import React,{useContext, useState} from 'react'
import contextValue from "../context/Notes/noteContext";

const AddNote = () => {
    const context  = useContext(contextValue);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:""});
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description, note.tag);
        setNote({title:"", description:"", tag:""});
    }
    const onchange = (e)=>{
         setNote({...note, [e.target.name]: e.target.value});
    }

  return (
    <div>
      <div className="container my-3">
        <h2>Add Note</h2>
        <form>
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">
             Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name='title'
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
             Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
             Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange}
            />
          </div>
         
          <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote

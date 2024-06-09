import React, { useContext, useEffect , useRef, useState} from 'react'
import contextValue from "../context/Notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

function Notes() {
  const context = useContext(contextValue);
  const { notes, getNotes } = context;
  const [note, setNote] = useState({etitle:"", edescription:"", etag:""});
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])
 const updateNote=(currNote)=>{
      ref.current.click();
      setNote({etitle: currNote.title, edescription: currNote.description, etag: currNote.tag})
 }
 const ref = useRef(null);
 const handleClick = (e)=>{
  e.preventDefault();
 
}
const onchange = (e)=>{
   setNote({...note, [e.target.name]: e.target.value});
}
  return (
    <>
      <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
          <div className="mb-3 my-3">
            <label htmlFor="etitle" className="form-label">
             Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name='etitle'
              value={note.etitle}
              aria-describedby="emailHelp"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
             Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              value={note.edescription}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
             Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              value={note.etag}
              onChange={onchange}
            />
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} updateNote = {updateNote} />;
        })}
      </div>
    </>
  )
}

export default Notes

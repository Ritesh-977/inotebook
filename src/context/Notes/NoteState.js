import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const noteinitial = [
        {
          "_id": "6662d69503255647d1369091",
          "user": "6661d833b76af39783ac5b72",
          "title": "Alarm",
          "description": "Contest at 8 pm",
          "tag": "contest",
          "Date": "2024-06-07T09:44:53.074Z",
          "__v": 0
        },
        {
          "_id": "66643f5c427798a75263ad61",
          "user": "6661d833b76af39783ac5b72",
          "title": "Alarm",
          "description": "Contest at 8 pm",
          "tag": "contest",
          "Date": "2024-06-08T11:24:12.714Z",
          "__v": 0
        },
        {
          "_id": "66643f5e427798a75263ad63",
          "user": "6661d833b76af39783ac5b72",
          "title": "Alarm",
          "description": "Contest at 8 pm",
          "tag": "contest",
          "Date": "2024-06-08T11:24:14.013Z",
          "__v": 0
        },
        {
          "_id": "66643f66427798a75263ad65",
          "user": "6661d833b76af39783ac5b72",
          "title": "Alarm",
          "description": "Contest at 8 pm",
          "tag": "contest",
          "Date": "2024-06-08T11:24:22.130Z",
          "__v": 0
        },
        {
          "_id": "66643f5e427798a75263ad63",
          "user": "6661d833b76af39783ac5b72",
          "title": "Alarm",
          "description": "Contest at 8 pm",
          "tag": "contest",
          "Date": "2024-06-08T11:24:14.013Z",
          "__v": 0
        },
        {
          "_id": "66643f66427798a75263ad65",
          "user": "6661d833b76af39783ac5b72",
          "title": "Alarm",
          "description": "Contest at 8 pm",
          "tag": "contest",
          "Date": "2024-06-08T11:24:22.130Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(noteinitial)
    return(
        <NoteContext.Provider value = {{notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;
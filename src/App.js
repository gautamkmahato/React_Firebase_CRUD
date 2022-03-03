import React, { useEffect, useState } from "react";
import {onSnapshot, collection,setDoc, doc, addDoc, getDocs,query, deleteDoc, where, serverTimestamp, orderBy, updateDoc} from 'firebase/firestore';
import db from "./firebase";
import './style.css'; 


function App(){
    
    const [colors, setColors] = useState([{name: "Loading...", id: "initial101"}]);
    const [name, setName] = useState("");
    const [RGB, setRGB] = useState("");
    const [inputBox, setInputBox] = useState(false);

    useEffect(() => {
      const collectionRef = collection(db, "colors");
      const q = query(collectionRef, orderBy("timestamp", "desc"))
      const unsub = onSnapshot(q, (snapshot) => {
        setColors(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
      });
      return unsub; 
    },[]);

    const handleInputBox = () => {
      setInputBox(true);
    }

    const handleNew = async () => {
      const collectionRef = collection(db, "colors");
      const payload = {name: name, rgb: RGB, timestamp: serverTimestamp()};
      //await setDoc(docRef, payload);
      const docRef = await addDoc(collectionRef, payload); 
    }

    const handleEdit = async (id) => {
      const name = prompt("Enter new Name...");
      const rgb = prompt("Enter new RGB...");
      const docRef = doc(db, "colors", id);
      const payload = {name: name, rgb: rgb, timestamp:serverTimestamp()}
      await updateDoc(docRef, payload);
    }

    const handleDelete = async (id) => {
      const docRef = doc(db, "colors", id);
      await deleteDoc(docRef);
    }

    const handleQueryDelete = async () => {
      const inputName = prompt("Enter the Name...");
      const collectionRef = collection(db, "colors");
      const q = query(collectionRef, where("name", "==", inputName));
      const snapshot = await getDocs(q);
      const result = snapshot.docs.map((doc) =>({...doc.data(), id:doc.id}))
      
      result.forEach(async (result) =>{
        const docRef = doc(db, "colors", result.id);
        await deleteDoc(docRef);
      });

    }


    return(
      <>
        <h1 style={{textAlign:"center"}}>React Firebase CRUD Application</h1>
        <button onClick={handleInputBox} className="new-button">New</button>
        {(inputBox) ? 
        <div className="input-section">
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Name..." />
          <br />
          <input type="text" value={RGB} onChange={(e) => {setRGB(e.target.value)}} placeholder="RGB..." />
          <br />
          <button onClick={handleNew}>Add</button>
        </div> :
        <div></div>}
        <button onClick={handleQueryDelete} className="new-button2">Query Delete</button>
        <hr />
        <ul>
          {colors.map((color) => (
            <li key={color.id} className="list">
              <button onClick={() => handleEdit(color.id)} >Edit</button>
              <button onClick={() => handleDelete(color.id)}>Delete</button>
              <p>{color.name}</p>
              <p>{color.rgb}</p>
            </li>
          ))}
          
        </ul>
      </>
    )
  
}


export default App;
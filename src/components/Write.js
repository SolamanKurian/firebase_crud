import React, { useState } from 'react'
import {app} from "../firebaseConfig"
import { getDatabase,ref,set,push } from 'firebase/database';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Write = () => {
    let [input1, setInput]=useState("");
    let [input2, setInput2]=useState("");
let navigate=useNavigate()
    const saveData=async()=>{
const db=getDatabase(app);
const newDocRef=push(ref(db,"nature/fruits"))
await set(newDocRef,{
    fruitName:input1,
    fruitDefenition:input2
}).then(()=>{
    alert("data saved successfully")
    navigate("/read")
}).catch((err)=>{
    alert("error: ",err?.message)
})

    }
  return (
    <div className='flex flex-col' >
    <input className='mt-4 rounded-md' type='text' value={input1} onChange={(e)=>{setInput(e.target.value)}}/>
    <input className='mt-4 rounded-md'  type='text' value={input2} onChange={(e)=>{setInput2(e.target.value)}}/>
    <button onClick={saveData} className='bg-gray-700 mt-4 w-4/12 mx-auto rounded-xl text-white'>Save</button>
    <Link to={"/read"}>Read</Link>
    <Link to={"/update"}>update</Link>
    </div>
  )
}

export default Write
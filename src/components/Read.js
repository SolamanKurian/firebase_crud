import React, { useState } from 'react'
import {app} from "../firebaseConfig"
import { getDatabase, ref, get } from 'firebase/database'
const Read = () => {

    let [fruits ,setFruits]=useState([])
    const fetchData=async()=>{
        const db=getDatabase(app)
        const dbRef=ref(db,"nature/fruits")
        const data=await get(dbRef);
        if(data){
            setFruits(Object.values(data.val()))// Object.values(data.val())--> to get data as array of objects
            
        }



    }
  return (
    <div>
        <button onClick={fetchData}>Click</button>
     <div>
        {fruits.length>0?(fruits.map((fruit,index)=>(
            <div key={index} className="mt-2 p-2 border rounded-md">
            <h3 className="text-lg font-semibold">Name: {fruit.fruitName}</h3>
            <p className="text-sm">Definition: {fruit.fruitDefenition}</p>
        </div> 
        ))):( <p>No fruits to display</p>)}
     </div>
    </div>
  )
}

export default Read
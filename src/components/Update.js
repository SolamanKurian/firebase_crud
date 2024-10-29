import React, { useEffect, useState } from 'react';
import { app } from "../firebaseConfig";
import { getDatabase, ref, get, update,remove } from 'firebase/database';

const Update = () => {

  let [mergedFruits, setMergedFruits] = useState([]);
  let [editMode, setEditMode] = useState(false);
  let [editedFruit, setEditedFruit] = useState({});

  const editFruit = (id, index) => {
    setEditMode(true);
    setEditedFruit({ ...mergedFruits[index], index }); // Set the fruit data and index in mergedFruits
  };
  const removeFruit=async(id)=>{
    const db=getDatabase(app);
    const fruitRef=ref(db,`/nature/fruits/${id}`)
await remove(fruitRef);
setMergedFruits(mergedFruits.filter(fruit => fruit.id !== id));
  }

  const saveFruit = async () => {
    if (!editedFruit.id) return;

    const db = getDatabase(app);
    const fruitRef = ref(db, `/nature/fruits/${editedFruit.id}`);
    
    // Update the specific fruit data in the database
    await update(fruitRef, {
      fruitName: editedFruit.fruitName,
      fruitDefenition: editedFruit.fruitDefenition
    });

    // Update mergedFruits with the edited data
    const updatedFruits = [...mergedFruits];
    updatedFruits[editedFruit.index] = { ...editedFruit };
    setMergedFruits(updatedFruits);

    // Reset edit mode and edited fruit state
    setEditMode(false);
    setEditedFruit({});
  };

  useEffect(() => {
    const getFruits = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "/nature/fruits");
      const data = await get(dbRef);
      if (data.exists()) {
        const fruitData = Object.values(data.val());
        const fruitKeys = Object.keys(data.val());
        const merged = fruitData.map((fruit, index) => ({
          id: fruitKeys[index], 
          ...fruit
        }));
        setMergedFruits(merged);
      }
    };
    getFruits();
  }, []);

  return (
    <div>
      <div>
        {mergedFruits.length > 0 ? (
          mergedFruits.map((fruit, index) => (
            <div key={index} className="mt-2 p-2 border rounded-md">
              {editMode && editedFruit.id === fruit.id ? (
                <div>
                  <input
                    className='mt-4 rounded-md'
                    type='text'
                    value={editedFruit.fruitName}
                    onChange={(e) =>
                      setEditedFruit({ ...editedFruit, fruitName: e.target.value })
                    }
                  />
                  <input
                    className='mt-4 rounded-md'
                    type='text'
                    value={editedFruit.fruitDefenition}
                    onChange={(e) =>
                      setEditedFruit({ ...editedFruit, fruitDefenition: e.target.value })
                    }
                  />
                  <button 
                    onClick={saveFruit}
                    className='bg-gray-700 mt-4 w-4/12 mx-auto rounded-xl text-white'
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">Name: {fruit.fruitName}</h3>
                  <p className="text-sm">Definition: {fruit.fruitDefenition}</p>
                  <button onClick={() => editFruit(fruit.id, index)}>Edit</button>
                  <button onClick={()=>{ removeFruit(fruit.id)}}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No fruits to display</p>
        )}
      </div>
    </div>
  );
};

export default Update;

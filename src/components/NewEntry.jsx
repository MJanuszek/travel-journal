import { useState, useEffect } from "react";
import { addDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function NewEnry() {
  const journalEntriesRef = collection(database, "journal-entries");
  const [newEntry, setNewEntry] = useState({
    name: "",
    date: 0,
    description: "",
    photo: null,
  });
  async function handleAddNewEntry(e) {
    e.preventDefault();
    console.log(newEntry);
    try {
      await addDoc(journalEntriesRef, {
        Name: newEntry.name,
        Date: newEntry.date,
        Description: newEntry.description,
      });
    } catch (err) {
      console.error(err);
    }
  }

  // todo: how to save in state photo from input ?
  return (
    <>
      <h3>Add new entry to your journal</h3>
      <form action="">
        <label htmlFor="trip-date"></label>
        <input
          type="date"
          id="trip-date"
          onChange={(e) => {
            setNewEntry((prevEntry) => ({
              ...prevEntry,
              date: Number(e.target.value),
            }));
          }}
        />

        <input
          type="text"
          placeholder="Name of place you visited"
          onChange={(e) => {
            setNewEntry((prevEntry) => ({
              ...prevEntry,
              name: e.target.value,
            }));
          }}
        />
        <input
          type="textarea"
          placeholder="write your memories..."
          onChange={(e) => {
            setNewEntry((prevEntry) => ({
              ...prevEntry,
              description: e.target.value,
            }));
          }}
        />
        <hr />
        <label htmlFor="trip-photo">Add photo</label>
        <input
          type="file"
          name=""
          id="trip-photo"
          style={{ border: "1px solid black" }}
        />
        <hr />
        <button className="btn" onClick={handleAddNewEntry}>
          Add new memory
        </button>
      </form>
    </>
  );
}

export default NewEnry;

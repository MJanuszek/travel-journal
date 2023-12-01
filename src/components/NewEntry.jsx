import { useState, useEffect } from "react";
import { addDoc } from "firebase/firestore";
import { database, auth } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function NewEnry() {
  const journalEntriesRef = collection(database, "journal-entries");
  const [newEntry, setNewEntry] = useState({
    name: "",
    date: 0,
    description: "",
  });
  const [photo, setPhoto] = useState({
    file: null,
    base64: "",
  });
  async function handleAddNewEntry(e) {
    e.preventDefault();
    console.log(newEntry);
    try {
      await addDoc(journalEntriesRef, {
        Name: newEntry.name,
        Date: newEntry.date,
        Description: newEntry.description,
        Photo: photo.base64,

        // userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  }
  // todo: how to save in state photo from input ?
  function handleChangePhotoToString(e) {
    let toPhotoConvert = e.target.files[0];
    if (toPhotoConvert) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto({
          file: toPhotoConvert,
          base64: reader.result,
        });
      };

      reader.readAsDataURL(toPhotoConvert);
    }
  }
  //
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
          onChange={handleChangePhotoToString}
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

import { useState, useEffect } from "react";

function NewEnry() {
  const [newEntry, setNewEntry] = useState({
    name: "",
    date: "",
    photo: null,
  });
  function handleAddNewEntry(e) {
    e.preventDefault();
    console.log(newEntry);
  }

  // todo: send data from newEntry to DB, then display them in Journal component
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
              date: e.target.value,
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
        <hr />
        <label htmlFor="trip-photo">Add photo</label>
        <input
          type="file"
          name=""
          id="trip-photo"
          style={{ border: "1px solid black" }}
        />
        <hr />
        <button onClick={handleAddNewEntry}>Add new memory</button>
      </form>
    </>
  );
}

export default NewEnry;

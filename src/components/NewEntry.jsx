import "../styles/new-entry.scss";
import { useState, useEffect } from "react";
import { addDoc } from "firebase/firestore";
import { database, auth } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
// library to analyze photo metadata and retrieve geolocation information:::
import ExifReader from "exifreader";
// https://www.npmjs.com/package/exifreader#usage

function NewEnry() {
  const [EntryVisability, setShowHideAddEntry] = useState("hide");
  const journalEntriesRef = collection(database, "journal-entries");
  const [newEntry, setNewEntry] = useState({
    name: "",
    date: null,
    description: "",
  });
  const [photo, setPhoto] = useState({
    file: null,
    base64: "",
  });
  // GET DIRECTIONS:::
  function getGPSDataFromPhoto(file) {
    let photoGPSData = ExifReader.load(file).then((data) => {
      let latitude = data.GPSLatitude.description;
      let longitude = data.GPSLongitude.description;
      console.log(latitude, longitude);
      return { latitude, longitude };
    });
    return photoGPSData;
  }

  async function handleAddNewEntry(e) {
    e.preventDefault();
    let photoGPSData = await getGPSDataFromPhoto(photo.file);
    console.log(photoGPSData);
    console.log(newEntry);
    try {
      await addDoc(journalEntriesRef, {
        Name: newEntry.name,
        Date: newEntry.date,
        Description: newEntry.description,
        Photo: photo.base64,
        Latitude: photoGPSData.latitude,
        Longitude: photoGPSData.longitude,

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
    <div id="addEntry" className="add-entry" onClick={setShowHideAddEntry}>
      <h3 className="add-entry-title">Add new entry to your journal</h3>
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
          className="input-textarea"
          type="textarea"
          placeholder="write your memories..."
          onChange={(e) => {
            setNewEntry((prevEntry) => ({
              ...prevEntry,
              description: e.target.value,
            }));
          }}
        />
        <br />
        <label className="input-file-label" htmlFor="trip-photo">
          Add photo (no bigger than 800kB)
        </label>
        <br />
        <input
          className="input-file"
          type="file"
          id="trip-photo"
          onChange={handleChangePhotoToString}
        />
        <hr />
        <button className="btn" onClick={handleAddNewEntry}>
          Add new memory
        </button>
      </form>
    </div>
  );
}

export default NewEnry;

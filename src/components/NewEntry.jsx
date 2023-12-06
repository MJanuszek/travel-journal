import "../styles/new-entry.scss";
import { useState, useEffect } from "react";
import { addDoc } from "firebase/firestore";
import { database, auth } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
// library to analyze photo metadata and retrieve geolocation information:::
import ExifReader from "exifreader";
// https://www.npmjs.com/package/exifreader#usage

function NewEnry() {
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
  const [user, setUser] = useState(null);
  // check which user is logged:::
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("authuser", authUser);
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);
  // GET DIRECTIONS:::
  function getGPSDataFromPhoto(file) {
    let photoGPSData = ExifReader.load(file).then((data) => {
      let latitude = data.GPSLatitude.description;
      let longitude = data.GPSLongitude.description;
      // console.log(latitude, longitude);
      return { latitude, longitude };
    });
    return photoGPSData;
  }

  async function handleAddNewEntry(e) {
    e.preventDefault();
    let photoGPSData = await getGPSDataFromPhoto(photo.file);
    // console.log(photoGPSData);
    // console.log("Identifier", user.uid);
    try {
      await addDoc(journalEntriesRef, {
        Name: newEntry.name,
        Date: newEntry.date,
        Description: newEntry.description,
        Photo: photo.base64,
        Latitude: photoGPSData.latitude,
        Longitude: photoGPSData.longitude,
        User: user ? user.uid : null,
      });
      console.log(newEntry.date);
      document.getElementById("trip-date").value = "";
      document.getElementById("name-of-place").value = "";
      document.getElementById("memories").value = "";
      document.getElementById("trip-photo").value = "";
    } catch (err) {
      console.error(err);
    }
  }
  // todo: how to save in state photo from input ?
  function handleChangePhotoToString(e) {
    let toPhotoConvert = e.target.files[0];
    if (toPhotoConvert) {
      const reader = new FileReader();
      // after file reading...onloaded:
      reader.onloadend = () => {
        setPhoto({
          file: toPhotoConvert,
          base64: reader.result,
        });
      };
      // the file content will be read as base64:::
      reader.readAsDataURL(toPhotoConvert);
    }
  }

  //
  return (
    <div id="addEntry" className="add-entry">
      <h3 className="add-entry-title">Add new entry to your journal</h3>
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
          id="name-of-place"
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
          id="memories"
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

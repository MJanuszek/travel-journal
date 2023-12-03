import { useState, useEffect, useRef } from "react";
import Entry from "./Entry";
import "../styles/journal.css";
import { auth } from "../config/firebase";
import { database } from "../config/firebase";
import ShowGooleMap from "./ShowGoogleMap";
import {
  getDocs,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

function JournalEntries() {
  // STATE FOR ALL YOURNAL ENTRIES FROM FIREBASE:::
  const [allEntries, setDisplayAll] = useState([]);
  // collection: method that gives references to the collection from firebase
  const journalEntriesRef = collection(database, "journal-entries");
  // STATE FOR DIRECTIONA LAT/LOG FOR MAPS::
  const [latitude, setLatitude] = useState(48.141);
  const [longitude, setLongitude] = useState(10.911);

  // DELATE::
  // this function will be passed as props to Entry component:
  async function deleteEntry(id) {
    console.log("id of entry to delete:", id);
    // need to pass the id of chosen entry to delete:
    const entryDel = doc(database, "journal-entries", id);
    await deleteDoc(entryDel);
  }
  // GET DIRECTIONS:::
  function getDirectionsForGoogleMaps(id, Latitude, Longitude) {
    console.log(
      "id of entry where photo is clicked :",
      id,
      Latitude,
      Longitude
    );
    let latitude = Latitude;
    let longitude = Longitude;
    console.log("xxxxxx", latitude, longitude);
    setLatitude(latitude);
    setLongitude(longitude);
  }

  // SET STATE AND DISPLAY CHANGES (by onSnapshot)::
  useEffect(() => {
    // onSnapshot checks changes in database collection, and refreshes view if needed;
    const unsubscribe = onSnapshot(journalEntriesRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      //  get journal entries from database and set them as state:
      setDisplayAll(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="jurnal-day-page">
      <h3>All memories:</h3>
      <ul>
        {allEntries.map((entry, index) => {
          return (
            <Entry
              key={index}
              name={entry.Name}
              description={entry.Description}
              date={entry.Date}
              photo={entry.Photo}
              handleDelete={() => deleteEntry(entry.id)}
              getDirectionsForGoogleMaps={() =>
                getDirectionsForGoogleMaps(
                  entry.id,
                  entry.Latitude,
                  entry.Longitude
                )
              }
            />
          );
        })}
      </ul>
      <ShowGooleMap
        coordinates={{ latitude: latitude, longitude: longitude }}
      />
    </div>
  );
}

export default JournalEntries;

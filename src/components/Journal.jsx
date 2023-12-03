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
  const [allEntries, setDisplayAll] = useState([]);
  // collection: method that gives references to the collection from firebase
  const journalEntriesRef = collection(database, "journal-entries");

  // DELATE::
  // this function will be passed as props to Entry component:
  async function deleteEntry(id) {
    console.log("id of entry to delete:", id);
    // need to pass the id of chosen entry to delete:
    const entryDel = doc(database, "journal-entries", id);
    await deleteDoc(entryDel);
  }
  // GET DIRECTIONS:::
  function getDirectionsForGoogleMaps(id) {
    console.log("id of entry where photo is clicked :", id);
    let latitude = 40.111;
    let longitude = 30.111;
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

  let latitude = 41.222;
  let longitude = 41.222;

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
                getDirectionsForGoogleMaps(entry.id)
              }
            />
          );
        })}
      </ul>
      <ShowGooleMap
        coordinates={{ latitude: latitude, longitude: longitude }}
      />
      {/* delate below later::::: */}
    </div>
  );
}

export default JournalEntries;

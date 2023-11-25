import { useState, useEffect } from "react";
import Entry from "./Entry";
import "../styles/journal.css";
import { auth } from "../config/firebase";
import { database } from "../config/firebase";
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
      <div className="journal-page-title">
        <button className="btn">Previous date</button>
        {/* <h2>{selectedDate}</h2> */}
        <button className="btn">Next date</button>
      </div>
      <ul>
        {/*  .filter((entry) => entry.date === selectedDate) */}
        {allEntries.map((entry, index) => {
          return (
            <Entry
              key={index}
              name={entry.Name}
              description={entry.Description}
              date={entry.Date}
              handleDelete={() => deleteEntry(entry.id)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default JournalEntries;

import { useState, useEffect } from "react";
import Entry from "./Entry";
import "../styles/journal.css";
import { auth } from "../config/firebase";
import { database } from "../config/firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";

function JournalEntries() {
  const [allEntries, setDisplayAll] = useState([]);
  // let selectedDate = "12.12.2012";

  const journalEntriesRef = collection(database, "journal-entries");
  //  get journal entries from database and set them as state:

  useEffect(() => {
    const unsubscribe = onSnapshot(journalEntriesRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
            />
          );
        })}
      </ul>
    </div>
  );
}

export default JournalEntries;

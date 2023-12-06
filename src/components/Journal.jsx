import { useState, useEffect, useRef } from "react";
import Entry from "./Entry";
import "../styles/journal.scss";
import { database, auth } from "../config/firebase";
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
  // isClicked is used to change zoom and center in ShowMapcComponent::
  const [isClicked, changeClicked] = useState(false);
  // check which user is logged:::
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      // console.log("authuser", authUser, "user:", user);
    });

    return () => unsubscribe();
  }, []);

  // DELETE::
  // this function will be passed as props to Entry component:
  async function deleteEntry(id) {
    console.log("id of entry to delete:", id);
    // need to pass the id of chosen entry to delete:
    const entryDel = doc(database, "journal-entries", id);
    await deleteDoc(entryDel);
  }
  // GET DIRECTIONS:::
  function getDirectionsForGoogleMaps(Latitude, Longitude) {
    let latitude = Latitude;
    let longitude = Longitude;
    setLatitude(latitude);
    setLongitude(longitude);
    changeClicked(true);
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
      <div className="wrapper">
        <h3 className="journal-title">All memories:</h3>
        <ShowGooleMap
          coordinates={{ latitude: latitude, longitude: longitude }}
          isClicked={isClicked}
        />
      </div>
      <ul>
        {allEntries
          .filter((entry) => entry.User === user.uid)
          .map((entry, index) => {
            return (
              <Entry
                className="single-entry"
                key={index}
                name={entry.Name}
                description={entry.Description}
                date={entry.Date}
                photo={entry.Photo}
                handleDelete={() => deleteEntry(entry.id)}
                getDirectionsForGoogleMaps={() =>
                  getDirectionsForGoogleMaps(entry.Latitude, entry.Longitude)
                }
              />
            );
          })}
      </ul>
    </div>
  );
}

export default JournalEntries;

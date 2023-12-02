// import { useState } from "react";
// maps api tutorial: https://www.youtube.com/watch?v=iP3DnhCUIsE
// firebase tutoriaL:  https://www.youtube.com/watch?v=2hR-uWjBAgw
// map pin icon copyright: <a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps and location icons">Maps and location icons created by Vector Stall - Flaticon</a>

import "../styles/App.css";
import JournalEntries from "./Journal";
import NewEntry from "./NewEntry";
import Header from "./Header";
import ShowGooleMap from "./ShowGoogleMap";
import { Auth } from "./Auth";

function App() {
  return (
    <>
      <Header />
      <Auth />
      <NewEntry />
      <JournalEntries />
      {/* <ShowGooleMap /> */}
    </>
  );
}

export default App;

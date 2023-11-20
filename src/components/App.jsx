// import { useState } from "react";
// maps api tutorial: https://www.youtube.com/watch?v=iP3DnhCUIsE
// firebase tutoriaL:  https://www.youtube.com/watch?v=2hR-uWjBAgw

import "../styles/App.css";
import JournalEntries from "./Journal";
import NewEntry from "./NewEntry";
import Header from "./Header";
import ShowGooleMap from "./ShowGoogleMap";

function App() {
  return (
    <>
      <Header />
      <NewEntry />
      <JournalEntries />
      <ShowGooleMap />
    </>
  );
}

export default App;

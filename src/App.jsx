// import { useState } from "react";

import "./App.css";
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

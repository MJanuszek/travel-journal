// import { useState } from "react";

import "./App.css";
import JournalEntries from "./Journal";
import NewEntry from "./NewEntry";

function App() {
  return (
    <>
      <NewEntry />
      <JournalEntries />
    </>
  );
}

export default App;

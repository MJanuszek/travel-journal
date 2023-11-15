// import { useState } from "react";

import "./App.css";
import JournalEntries from "./Journal";
import NewEntry from "./NewEntry";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <NewEntry />
      <JournalEntries />
    </>
  );
}

export default App;

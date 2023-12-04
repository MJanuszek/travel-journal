// import { useState } from "react";
// maps api tutorial: https://www.youtube.com/watch?v=iP3DnhCUIsE
// firebase tutoriaL:  https://www.youtube.com/watch?v=2hR-uWjBAgw
// map pin icon copyright: <a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps and location icons">Maps and location icons created by Vector Stall - Flaticon</a>

import "../styles/App.scss";
import { useState } from "react";
import JournalEntries from "./Journal";
import NewEntry from "./NewEntry";
import Header from "./Header";

import { Auth } from "./Auth";
// const isLogged = true;
function App() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = (value) => {
    setIsLogged(value);
  };
  return (
    <div className="container">
      <Header />
      {isLogged ? (
        <>
          <NewEntry />
          <JournalEntries />
          <Auth onLogin={handleLogin} />
        </>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
      {/* <Auth />
      <NewEntry />
      <JournalEntries /> */}
      {/* <ShowGooleMap /> */}
    </div>
  );
}

export default App;

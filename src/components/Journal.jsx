import { useState, useEffect } from "react";
import Entry from "./Entry";
import "../styles/journal.css";

const startEntries = [
  {
    name: "Osaka",
    date: "12.12.2012",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et quaerat error sit vel in similique perferendis velit, porro ex cum! Dolore ducimus animi qui, quas nulla voluptas asperiores reiciendis veritatis",
    photo: null,
  },
  {
    name: "Okayama",
    date: "12.11.2012",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et quaerat error sit vel in similique perferendis velit, porro ex cum! Dolore ducimus animi qui, quas nulla voluptas asperiores reiciendis veritatis",
    photo: null,
  },
  {
    name: "Kyoto",
    date: "12.12.2012",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et quaerat error sit vel in similique perferendis velit, porro ex cum! Dolore ducimus animi qui, quas nulla voluptas asperiores reiciendis veritatis",
    photo: null,
  },
];

function JournalEntries() {
  // const [allEntries, setDisplayAll] = useState();
  let selectedDate = "12.12.2012";
  return (
    <div className="jurnal-day-page">
      <div className="journal-page-title">
        <button className="btn">Previous date</button>
        <h2>{selectedDate}</h2>
        <button className="btn">Next date</button>
      </div>

      <ul>
        {startEntries
          .filter((entry) => entry.date === selectedDate)
          .map((entry, index) => {
            return (
              <Entry
                key={index}
                name={entry.name}
                description={entry.description}
                date={entry.date}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default JournalEntries;

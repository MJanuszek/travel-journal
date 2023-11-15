import { useState, useEffect } from "react";
import Entry from "./Entry";

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
    date: "12.12.2012",
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
  return (
    <>
      <h2>All previous entries:</h2>
      <ul>
        {startEntries.map((entry, index) => {
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
    </>
  );
}

export default JournalEntries;

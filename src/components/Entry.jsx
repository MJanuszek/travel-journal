import "../styles/entry.css";

function Entry({ name, description, date, photo }) {
  return (
    <div className="single-entry">
      <div className="entry">
        <h3 className="entry-name">{name}</h3>
        <div className="entry-description">{description}</div>
        <div className="entry-date">{date}</div>
      </div>
      <div className="entry-photo">photo</div>
    </div>
  );
}

export default Entry;

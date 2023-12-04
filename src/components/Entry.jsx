import "../styles/App.scss";

function Entry({
  name,
  description,
  date,
  getDirectionsForGoogleMaps,
  handleDelete,
  photo,
}) {
  return (
    <div className="single-entry">
      <div className="entry">
        <h3 className="entry-name">{name}</h3>
        <div className="entry-description">{description}</div>
        <div className="entry-date">{date}</div>
      </div>
      <div className="entry-photo" onClick={getDirectionsForGoogleMaps}>
        <img
          src={photo}
          alt="Base64 Image"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      </div>
      <button className="btn" onClick={handleDelete}>
        Delete this entry
      </button>
    </div>
  );
}

export default Entry;

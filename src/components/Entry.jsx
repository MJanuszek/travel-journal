import "../styles/entry.scss";

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
      <div className="entry-photo" onClick={getDirectionsForGoogleMaps}>
        <img
          src={photo}
          alt="Base64 Image"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      </div>
      <div className="entry">
        <h3 className="entry-name">{name}</h3>
        <div className="entry-date">{date}</div>
        <div className="entry-description">{description}</div>
        <button className="btn-delate" onClick={handleDelete}>
          Delete entry
        </button>
      </div>
    </div>
  );
}

export default Entry;

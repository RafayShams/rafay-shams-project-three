import no_image from "../assets/no_image.png";
import { Link } from "react-router-dom";

function MovieDetails(props) {
  const altText = props.title;

  let imgSource;
  if (props.poster) {
    imgSource = `https://image.tmdb.org/t/p/w300/${props.poster}`;
  } else {
    imgSource = no_image;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="movieList">
      <div className="posterAndInfo">
        <div className="posterContainer">
          <img src={imgSource} alt={altText} />
        </div>

        <div className="movieInfo">
          <h3>{props.title}</h3>
          <p>{props.synopsis}</p>
          <p>{props.releaseDate}</p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="reviewButtons">
        <Link to={`/reviewForm/${props.title}`}>
          <button type="submit">Review movie</button>
        </Link>
        <Link to={`/reviews/${props.title}`}>
          <button type="submit">Other reviews</button>
        </Link>
      </form>
    </div>
  );
}

export default MovieDetails;

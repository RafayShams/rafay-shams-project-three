//no_image is a photo that will be attached to movies that have no posters
import no_image from "../assets/no_image.png";
import { Link } from "react-router-dom";

function MovieDetails(props) {
  // props are coming from the MovieList component
  const altText = props.title;
  let imgSource;
  
  //this if statement checks if a movie has a poster, if yest then imgSource is 
  //set to that poster url. If not no_image photo is attached
  if (props.poster) {
    imgSource = `https://image.tmdb.org/t/p/w300/${props.poster}`;
  } else {
    imgSource = no_image;
  }

  //this function prevents default refreshing of page on submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="movieList">
      <div className="posterAndInfo">
        
        {/* Movie poster */}
        <div className="posterContainer">
          <img src={imgSource} alt={altText} />
        </div>
        
        {/* Information about the movie */}
        <div className="movieInfo">
          <h3>{props.title}</h3>
          <p>{props.synopsis}</p>
          <p>{props.releaseDate}</p>
        </div>
      </div>

      {/* This form has 2 buttons. 1 button leads to the review form
      The other button leads to previous reviews left by others */}
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

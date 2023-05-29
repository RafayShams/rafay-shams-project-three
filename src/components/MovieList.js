import no_image from "../assets/no_image.png"

function MovieList(props) {
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
      <img src={imgSource} alt={altText} />
      <div className="movieInfo">
        <h3>{props.title}</h3>
        <p>{props.synopsis}</p>
        <p>{props.releaseDate}</p>
      </div>
    <form onSubmit={(e) => handleSubmit(e)}>
      <button
        type="submit"
        onClick={(e) => props.getReviewForm(e, props.title)}
      >Review movie
      </button>
      <button 
        type="submit"
        onClick={(e) => props.getReviews(e, props.title)}
      >Other reviews
      </button>
    </form>
    </div>
  );
}

export default MovieList;
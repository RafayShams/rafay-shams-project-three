import no_image from "../assets/no_image.png"

function MovieList(props) {
  console.log("MovieList.js has loaded");
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
    <div>
      <img src={imgSource} alt={altText} />
      <h3>{props.title}</h3>
      <p>{props.synopsis}</p>
      <p>{props.releaseDate}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <button
          type="submit"
          onClick={(e) => props.getReviewForm(e, props.title)}
        >Review this movie
        </button>
        <button 
          type="submit"
          onClick={(e) => props.getReviews(e, props.title)}
        >See other reviews
        </button>
      </form>
    </div>
  );
}

export default MovieList;
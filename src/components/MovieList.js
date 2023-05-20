function MovieList(props) {
  const altText = props.title;
  const imgSource = `https://image.tmdb.org/t/p/w300/${props.poster}`;

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <img src={imgSource} alt={altText} />
      <h3>{props.title}</h3>
      <p>{props.synopsis}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <button
          type="submit"
          onClick={(e) => props.getReviewForm(e, props.title)}
        >
          Review this movie
        </button>
        <button type="submit">See other reviews</button>
      </form>
    </div>
  );
}

export default MovieList;
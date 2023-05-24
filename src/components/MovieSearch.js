import { useState } from "react";

function MovieSearch(props) {
  const [movieInput, setMovieInput] = useState("");

  const handleMovieChange = (event) => {
    console.log(event.target.value);
    setMovieInput(event.target.value);
  };

  const handleSubmit = (e) => {
    props.getMovies(e, movieInput);
    setMovieInput("");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>Please enter a movie name to search movies to review</label>
      <input
        type="text"
        placeholder="Enter movie name"
        onChange={handleMovieChange}
        value={movieInput}
      />
      <button type="submit">Search Movie</button>
    </form>
  );
}

export default MovieSearch;

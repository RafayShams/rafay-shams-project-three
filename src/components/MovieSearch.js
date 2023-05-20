import { useState } from "react";

function MovieSearch(props) {
  const [movieInput, setMovieInput] = useState("");

  const handleMovieChange = (event) => {
    setMovieInput(event.target.value);
  };

  return (
    <form onSubmit={(e) => props.getMovies(e, movieInput)}>
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

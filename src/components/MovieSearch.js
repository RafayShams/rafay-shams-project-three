import { useState } from "react";
import { Link } from "react-router-dom";

function MovieSearch() {
  const [movieInput, setMovieInput] = useState("");

  // movieInput state variable holds the movie users search for
  const handleMovieChange = (event) => {
    setMovieInput(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMovieInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="movieSearchForm">
      <label>Please enter a movie name to search movies to review</label>
      <input
        type="text"
        placeholder="Enter movie name"
        onChange={handleMovieChange}
        value={movieInput}
      />
      {/* This links to the MovieList component */}
      <Link to={`/movieSearch/${movieInput}`} className="movieSearchButton">
        <button type="submit">Search Movie</button>
      </Link>
    </form>
  );
}

export default MovieSearch;

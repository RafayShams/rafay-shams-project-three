import { useState } from "react";
import axios from "axios";

function MovieSearch(props) {
  console.log("MovieSearch.js has loaded");
  const [movieInput, setMovieInput] = useState("");

  const handleMovieChange = (event) => {
    setMovieInput(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getMovies(e, movieInput);
    //  axios({
    //   url: "https://api.themoviedb.org/3/search/movie",
    //   method: "GET",
    //   dataResponse: "json",
    //   params: {
    //     api_key: "c7d2bc1af674054e4cbfe886c8424b11",
    //     query: movieInput,
    //     include_adult: "false"
    //   }
    // }).then((res) => {
    //   
    //   props.setMovieList(res.data.results);
    // });
    setMovieInput("");
    props.clear();
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

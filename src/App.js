import { useEffect, useState } from "react";
import axios from "axios";
import MovieSearch from "./components/MovieSearch";
import MovieList from "./components/MovieList";
import "./App.css";
import ReviewForm from "./components/ReviewForm";

export default function App() {
  const [movieName, setMovieName] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [movieToReview, setMovieToReview] = useState("");

  const getMovies = (e, userMovie) => {
    e.preventDefault();
    setMovieName(userMovie);
  };

  const getReviewForm = (e, movieToReview) => {
    e.preventDefault();
    console.log(`movie to be reviewed ${movieToReview}`);
    setMovieToReview(movieToReview);
    setMovieList([]);
  };

  const clearReviewForm = () => {
    setMovieToReview("");
  }

  useEffect(() => {
    axios({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      dataResponse: "json",
      params: {
        api_key: "c7d2bc1af674054e4cbfe886c8424b11",
        query: movieName,
        include_adult: "false"
      }
    }).then((res) => {
      console.log(res.data.results);
      setMovieList(res.data.results);
    });
  }, [movieName]);

  return (
    <div className="App">
      <h1>Movie Reviewer</h1>
      <h2>All your movie reviews in one place!</h2>
      <MovieSearch getMovies={getMovies} />
      
      <ul>
        {movieList.map((movie) => {
        return (
          <MovieList
            key={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            synopsis={movie.overview}
            releaseDate ={movie.release_date}
            getReviewForm={getReviewForm}
          />
        );
      })}
      </ul>
   
      {movieToReview === "" ? (
        console.log("no movie")
      ) : (
        <ReviewForm movie={movieToReview} clear={clearReviewForm}/>
      )}
    </div>
  );
}
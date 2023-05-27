import ReviewForm from "./components/ReviewForm";
import MovieSearch from "./components/MovieSearch";
import MovieList from "./components/MovieList";
import Reviews from "./components/Reviews";

import axios from "axios";
import firebase from "./firebase";
import { getDatabase, ref, onValue } from "firebase/database";

import { useEffect, useState } from "react";

import "./App.css";


export default function App() {
  console.log("App.js has loaded");
  const [movieName, setMovieName] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [movieToReview, setMovieToReview] = useState("");
  const [reviewList, setReviewList] = useState([]);
  
  let allReviews

  const getMovies = (e, movieInput) => {
    e.preventDefault();
    setTimeout(() => {
      setMovieName(movieInput);
    }, "50");
    setMovieName("");
  };


  const getReviewForm = (e, movieToReview) => {
    e.preventDefault();
    setMovieToReview(movieToReview);
    setMovieList([]);
  };

  const clearReviewForm = () => {
    setMovieToReview("");
    setReviewList([]);
  }

  const getReviews = (e, findReviewsFor) => {
    e.preventDefault();
    setMovieList([]);

    const database = getDatabase(firebase);
    const dbRef = ref(database);
  
    onValue(dbRef, (response) => {
      // here we use Firebase's .val() method to parse our database info the way we want it
      allReviews = response.val();

      const reviewsForUserMovie = []
      for (let item in allReviews) {
        
        if (allReviews[item].movieName === findReviewsFor) {
          reviewsForUserMovie.push(allReviews[item])
        }
      }
      setReviewList(reviewsForUserMovie);
    });
  };

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
      setMovieList(res.data.results);
    });
  }, [movieName]);

  return (
    <div className="App">
      <h1>Movie Reviewer</h1>
      <h2>All your movie reviews in one place!</h2>
      <MovieSearch getMovies={getMovies} clear={clearReviewForm} setMovieList = {setMovieList}/>
      
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
            getReviews={getReviews}
          />
        );
      })}
      </ul>
   
      {movieToReview === "" 
        ? console.log("")
        : <ReviewForm movie={movieToReview} clear={clearReviewForm}/>
      }

      <ul>
        {reviewList.map((review) => {
        return (
          <Reviews
            title={review.movieName}
            reviewer={review.reviewer}
            rating={review.rating}
            reviewGiven ={review.review}
            date={review.displayDate}
          />
        );
      })}
      </ul>

    </div>
  );
}
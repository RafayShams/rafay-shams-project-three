import ReviewForm from "./components/ReviewForm";
import MovieSearch from "./components/MovieSearch";
import MovieList from "./components/MovieList";
import Reviews from "./components/Reviews";

import axios from "axios";
import firebase from "./firebase";
import { getDatabase, ref, onValue , push} from "firebase/database";

import { useEffect, useState } from "react";

import "./App.css";


export default function App() {
  const [movieName, setMovieName] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [movieToReview, setMovieToReview] = useState("");
  const [reviewList, setReviewList] = useState([]);
  
  let allReviews
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

  const getReviews = (e, findReviewsFor) => {
    e.preventDefault();
    console.log(`finding reviews for ${findReviewsFor}`);
    setMovieList([]);

    const database = getDatabase(firebase);
    const dbRef = ref(database);
  
    onValue(dbRef, (response) => {
      // here we use Firebase's .val() method to parse our database info the way we want it
      console.log(response.val());
      allReviews = response.val();
      console.log(allReviews);
    
      const reviewsForUserMovie = []
      for (let item in allReviews) {
        console.log(allReviews[item]);  
        if (allReviews[item].movieName === findReviewsFor) {
          console.log("pushing into reviewList");
          reviewsForUserMovie.push(allReviews[item])
        }
      }
      setReviewList(reviewsForUserMovie);
      console.log(reviewList);
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
            getReviews={getReviews}
          />
        );
      })}
      </ul>
   
      {movieToReview === "" 
        ? console.log("no movie")
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
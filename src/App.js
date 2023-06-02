//importing components
import ReviewForm from "./components/ReviewForm";
import MovieSearch from "./components/MovieSearch";
import MovieList from "./components/MovieList";
import Reviews from "./components/Reviews";
import Header from "./components/Header";

//importing firebase and axios
import axios from "axios";
import firebase from "./firebase";
import { getDatabase, ref, onValue } from "firebase/database";

//importing Hooks
import { useEffect, useState } from "react";

//importing stylesheet
import "./App.css";

//creating and exporting the App component
export default function App() {

  //declaring state variables
  const [movieName, setMovieName] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [movieToReview, setMovieToReview] = useState("");
  const [reviewList, setReviewList] = useState([]);

  //this function gets the movie name that the user enters in the search bar in the MovieSearch component
  const getMovies = (e, movieInput) => {

    //prevents refresh of the page when the user submits the movie name in the MovieSearch component
    e.preventDefault();

    //this block of code first sets the movieName to empty string and after
    //50 millisceonds sets the movie name to whatever was typed in the search bar by the user
    //the search timeout function was implemented to make sure the app works even if the user types the
    //same movie name twice in a row
    setTimeout(() => {
      setMovieName(movieInput); 
    }, "50");
    setMovieName("");
  };


  //this function runs when the user clicks on "Review this movie"
  //page refresh is prevented and movieToReview state variable is updated to the movie name which is being reviewed
  const getReviewForm = (e, movieToReview) => {
    e.preventDefault();
    setMovieToReview(movieToReview);
    setMovieList([]);
  };

  //this function runs when either "Review movie" or "Other reviews" button are clicked
  //this function also runs when ReviewForm component is submitted
  const clearReviewForm = () => {
    setMovieToReview("");
    setReviewList([]);
  }

  //allReviews variable will be used to hold all the reviews stored in firebase
  let allReviews

  //this function is run when user clicks "Other reviews"
  const getReviews = (e, findReviewsFor) => {
    e.preventDefault();
    setMovieList([]);

    //connecting to firebase
    const database = getDatabase(firebase);
    const dbRef = ref(database);
  
    //getting all reviews
    onValue(dbRef, (response) => {
      allReviews = response.val();

      //this variable will hold all reviews for the movie that the user clicked on
      const reviewsForUserMovie = []
      for (let item in allReviews) {
        
        if (allReviews[item].movieName === findReviewsFor) {
          reviewsForUserMovie.push(allReviews[item])
        }
      }
      //all the other reviews for the users choice of movie will be stored in ReviewList state variable
      setReviewList(reviewsForUserMovie);
    });
  };

  //this useEffect will make the api call whenever a user searches for a movie in the MovieSearch component
  //this effect will run every time the movieName component is updated
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
      <Header />
      <MovieSearch getMovies={getMovies} clear={clearReviewForm} setMovieList = {setMovieList}/>
      
      <ul id="list">
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
        ? <></>
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
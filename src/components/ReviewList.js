import { useParams } from "react-router-dom";
import firebase from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import Review from "./Review";

//importing Hooks
import { useEffect, useState } from "react";

//This component will return all reviews for a particular movie
function ReviewList() {
  const { movieName } = useParams();
  const [reviewList, setReviewList] = useState([]);
  
  useEffect(() => {
    //allReviews will hold all reviews from firebase
    let allReviews;
    
    //connecting to firebase
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    //getting all reviews
    onValue(dbRef, (response) => {
      allReviews = response.val();

      //this variable will hold all reviews for the movie that the user clicked on
      const reviewsForUserMovie = [];
      for (let item in allReviews) {
        if (allReviews[item].movieName === movieName) {
          allReviews[item].key = item; //this is to provide a unique key prop
          reviewsForUserMovie.push(allReviews[item]);
        }
      }
      //all the other reviews for the users choice of movie will be stored in ReviewList state variable
      setReviewList(reviewsForUserMovie);
    });
  }, [movieName]);

  return (
    <div className="reviewSection">
      {/* This ternary operator checks if there are any reviews or not */}
      {reviewList.length === 0 
      ? (
          <h3>There are no reviews yet for {movieName}</h3>
        ) 
      : 
      (
        <>
        {/* Return a list of reviews by calling the Review component */}
          <h3>Reviews for {movieName}</h3>
          <ul className="review">
            {reviewList.map((review) => {
              return (
                <li key={review.key}>
                  <Review
                  title={review.movieName}
                  reviewer={review.reviewer}
                  rating={review.rating}
                  reviewGiven={review.review}
                  date={review.displayDate}
                />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default ReviewList;
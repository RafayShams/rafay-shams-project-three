import { useParams } from "react-router-dom";
import firebase from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import Review from "./Review";

//importing Hooks
import { useEffect, useState } from "react";

function ReviewList() {
  const { movieName } = useParams();
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    let allReviews;
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    //getting all reviews
    onValue(dbRef, (response) => {
      allReviews = response.val();

      //this variable will hold all reviews for the movie that the user clicked on
      const reviewsForUserMovie = [];
      for (let item in allReviews) {
        if (allReviews[item].movieName === movieName) {
          reviewsForUserMovie.push(allReviews[item]);
        }
      }
      console.log(reviewsForUserMovie);
      //all the other reviews for the users choice of movie will be stored in ReviewList state variable
      setReviewList(reviewsForUserMovie);
      console.log(reviewList);
    });
  }, [movieName]);

  return (
    <div className="review">
      {reviewList.lenght === 0 ? (
        <h2>There are no reviews yet for {movieName}</h2>
      ) : (
        <>
          <h2>Reviews for {movieName}</h2>
          <ul>
            {reviewList.map((review) => {
              return (
                <Review
                  title={review.movieName}
                  reviewer={review.reviewer}
                  rating={review.rating}
                  reviewGiven={review.review}
                  date={review.displayDate}
                />
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default ReviewList;

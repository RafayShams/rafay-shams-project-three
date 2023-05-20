import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from "../firebase";

function ReviewForm(props) {
  const [reviewerName, setReviewerName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      // here we use Firebase's .val() method to parse our database info the way we want it
      console.log(response.val());
    });
  });

  const handleReviewerChange = (e) => {
    console.log(e.target.value);
    setReviewerName(e.target.value);
  }

  const handleRatingChange = (e) => {
    console.log(e.target.value);
    setRating(e.target.value);
  }

  const handleReviewChange = (e) => {
    console.log(e.target.value);
    setReview(e.target.value);
  }

  return (
    <form>
      <h4>You are reviewing {props.movie}</h4>
      <label>Reviewer Name</label>
      <input 
        type="text" 
        placeholder="Enter name"
        onChange={handleReviewerChange}
        value={reviewerName}
      />
      <label>Rating</label>
      <input 
        type="number" 
        min="1" 
        max="5"
        onChange={handleRatingChange}
        value={rating}
      />
      <label>Review</label>
      <textarea 
        placeholder="Leave a Review"
        onChange={handleReviewChange}
        value={review}
      >
      </textarea>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;

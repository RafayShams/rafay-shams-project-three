import { useState, useEffect } from "react";
import { getDatabase, ref, onValue , push} from "firebase/database";
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
    });
  }, []);

  const handleReviewerChange = (e) => {
    setReviewerName(e.target.value);
  }

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  }

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault(); 
    const currentDate = new Date();
    const monthNumber = currentDate.getMonth();
    let month
    // eslint-disable-next-line default-case
    switch (monthNumber) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February"
        break;
      case 2:
        month = "March"
        break;
      case 3:
        month = "April"
        break;
      case 4:
        month = "May"
        break;
      case 5:
        month = "June"
        break;
      case 6:
        month = "July"
        break;
      case 7:
        month = "August"
        break;
      case 8:
        month = "September"
        break;
      case 9:
        month = "October"
        break;
      case 10:
        month = "November"
        break;
      case 11:
        month = "December"
        break;
    }
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    
    let reviewObject = {
      movieName: props.movie,
      reviewer: reviewerName,
      rating: rating,
      review: review,
      date: Date(),
      displayDate: `${month} ${day}, ${year}`
    }


    // push the value of the `userInput` state to the database
    push(dbRef, reviewObject);
    
    // reset the state to an empty string
    reviewObject = {};
    setReviewerName("");
    setRating("");
    setReview("");

    props.clear();
  }
  return (
    <form onSubmit={handleReviewSubmit}>
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

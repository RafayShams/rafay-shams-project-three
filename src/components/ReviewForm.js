import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import firebase from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

function ReviewForm() {
  const [reviewerName, setReviewerName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const { movieName } = useParams();
  const navigate = useNavigate();

  const handleReviewerChange = (e) => {
    setReviewerName(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleStar1 = () => {
    document.getElementById("star1").classList.add("yellowStar");
    document.getElementById("star2").classList.remove("yellowStar");
    document.getElementById("star3").classList.remove("yellowStar");
    document.getElementById("star4").classList.remove("yellowStar");
    document.getElementById("star5").classList.remove("yellowStar");
    setRating(1);
  };

  const handleStar2 = () => {
    document.getElementById("star1").classList.add("yellowStar");
    document.getElementById("star2").classList.add("yellowStar");
    document.getElementById("star3").classList.remove("yellowStar");
    document.getElementById("star4").classList.remove("yellowStar");
    document.getElementById("star5").classList.remove("yellowStar");
    setRating(2);
  };

  const handleStar3 = () => {
    document.getElementById("star1").classList.add("yellowStar");
    document.getElementById("star2").classList.add("yellowStar");
    document.getElementById("star3").classList.add("yellowStar");
    document.getElementById("star4").classList.remove("yellowStar");
    document.getElementById("star5").classList.remove("yellowStar");
    setRating(3);
  };

  const handleStar4 = () => {
    document.getElementById("star1").classList.add("yellowStar");
    document.getElementById("star2").classList.add("yellowStar");
    document.getElementById("star3").classList.add("yellowStar");
    document.getElementById("star4").classList.add("yellowStar");
    document.getElementById("star5").classList.remove("yellowStar");
    setRating(4);
  };

  const handleStar5 = () => {
    document.getElementById("star1").classList.add("yellowStar");
    document.getElementById("star2").classList.add("yellowStar");
    document.getElementById("star3").classList.add("yellowStar");
    document.getElementById("star4").classList.add("yellowStar");
    document.getElementById("star5").classList.add("yellowStar");
    setRating(5);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const monthNumber = currentDate.getMonth();
    let month;
    // eslint-disable-next-line default-case
    switch (monthNumber) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
    }
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    let reviewObject = {
      movieName: movieName,
      reviewer: reviewerName,
      rating: rating,
      review: review,
      date: Date(),
      displayDate: `${month} ${day}, ${year}`,
    };

    // push the value of the `userInput` state to the database
    push(dbRef, reviewObject);

    // reset the state to an empty string
    reviewObject = {};
    setReviewerName("");
    setRating("");
    setReview("");

    navigate(`/Thanks/${movieName}`);
    // props.clear();
  };
  return (
    <form className="reviewForm" onSubmit={handleReviewSubmit}>
      <h3>You are reviewing {movieName}</h3>
      <label>Reviewer Name</label>
      <input
        type="text"
        placeholder="Enter name"
        onChange={handleReviewerChange}
        value={reviewerName}
        required
      />
      <label>Rating</label>
      <div className="stars">
        <FontAwesomeIcon
          className="star"
          id="star1"
          onClick={handleStar1}
          icon={faStar}
        />
        <FontAwesomeIcon
          className="star"
          id="star2"
          onClick={handleStar2}
          icon={faStar}
        />
        <FontAwesomeIcon
          className="star"
          id="star3"
          onClick={handleStar3}
          icon={faStar}
        />
        <FontAwesomeIcon
          className="star"
          id="star4"
          onClick={handleStar4}
          icon={faStar}
        />
        <FontAwesomeIcon
          className="star"
          id="star5"
          onClick={handleStar5}
          icon={faStar}
        />
      </div>
      <label>Review</label>
      <textarea
        placeholder="Leave a Review"
        onChange={handleReviewChange}
        value={review}
      ></textarea>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import firebase from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

function ReviewForm() {
  const [reviewerName, setReviewerName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const { movieName } = useParams();
  const navigate = useNavigate();

  // state variables ReviewerName and review hold users input information
  const handleReviewerChange = (e) => {
    setReviewerName(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };
  
  //The next five functions handle when a user clicks on a star
  //The number of yellow stars and uncolored stars change depending 
  //on what rating a user gives a movie
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

    //if a user forgot to click on a star, they will be alerted to do so
    if (rating === 0) {
      alert("Please leave a rating by clicking on one of the stars");
    } else {
      //getting the date when the user clicked on submit review
      const currentDate = new Date();
      
      //this converts the month number to month name
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
      
      //getting current date and year
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      
      //connecting to firebase
      const database = getDatabase(firebase);
      const dbRef = ref(database);

      //this object contains all the review information
      let reviewObject = {
        movieName: movieName,
        reviewer: reviewerName,
        rating: rating,
        review: review,
        date: Date(),
        displayDate: `${month} ${day}, ${year}`,
      };

      // pushing the reviewObject into firebase
      push(dbRef, reviewObject);

      // reset the state variables
      reviewObject = {};
      setReviewerName("");
      setRating(0);
      setReview("");

      //navigating to Thanks components
      navigate(`/Thanks/${movieName}`);
    }
  };
  
  //Review form is returned
  return (
    <form className="reviewForm" onSubmit={handleReviewSubmit}>
      <h3>You are reviewing {movieName}</h3>
      <label htmlFor="reviewersName">Reviewer Name</label>
      <input
        type="text"
        id="reviewersName"
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
      <label htmlFor="reviewArea">Review</label>
      <textarea
        placeholder="Leave a Review"
        id="reviewArea"
        onChange={handleReviewChange}
        value={review}
      ></textarea>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;

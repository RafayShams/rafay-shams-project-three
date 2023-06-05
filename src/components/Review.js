import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

//This component shows individual reviews
function Review(props) {
  //props is coming from ReviewList component
  
  //This code block creates and populates a ratings array which contains
  //numbers equal to the rating left by a user. For exmaple, a user gave
  // a 4 star rating.  This array will be [0, 1, 2, 3] 
  const ratingsArray = [];
  for (let i = 0; i < props.rating; i++) {
    ratingsArray.push(i);
  }

  //review card is returned
  return (
    <>
      <div className="reviewerDate">
        <p>Reviewer: {props.reviewer}</p>
        <p>Review Date: {props.date}</p>
      </div>
      <p>Rating:</p>
      <div className="stars">
        {/* This loop creates the number of stars eqaul to the rating 
        left by the user */}
        {ratingsArray.map((index) => {
          return <FontAwesomeIcon className="yellowStar" icon={faStar} key={index}/>;
        })}
      </div>
      <p>{props.reviewGiven}</p>
    </>
  );
}

export default Review;

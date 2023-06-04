import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Review(props) {
  const ratingsArray = [];
  for (let i = 0; i < props.rating; i++) {
    ratingsArray.push("star");
  }

  return (
    <>
      <div className="reviewerDate">
        <p>Reviewer: {props.reviewer}</p>
        <p>Review Date: {props.date}</p>
      </div>
      <p>Rating:</p>
      <div className="stars">
        {ratingsArray.map(() => {
          return <FontAwesomeIcon className="yellowStar" icon={faStar} />;
        })}
      </div>
      <p>{props.reviewGiven}</p>
    </>
  );
}

export default Review;

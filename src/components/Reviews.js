function Reviews(props) {
  return (
    <div className="review">
      <h3>Movie: {props.title}</h3>
      <div className="reviewerDate">
        <p>Reviewer: {props.reviewer}</p>
        <p>Review Date: {props.date}</p>
      </div>
      <p>Rating: {props.rating}</p>
      <p>{props.reviewGiven}</p>
    </div>
  );
}

export default Reviews;
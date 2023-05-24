function Reviews(props) {
  console.log("I am the Reviews component");
  return (
    <div>
      <h4>{props.title}</h4>
      <p>{props.reviewer}</p>
      <p>{props.displayDate}</p>
      <p>{props.rating}</p>
      <p>{props.reviewGiven}</p>
    </div>
  )
}

export default Reviews
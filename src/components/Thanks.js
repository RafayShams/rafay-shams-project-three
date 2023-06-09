import { useParams, Link } from "react-router-dom";

// This component thanks the user for submitting a review and allows them to
// see all reviews for a particular movie.  
function Thanks() {
  const { movieName } = useParams();

  return (
    <div className="thanks">
      <h3>Thanks for reviewing {movieName}</h3>
      <p>See all reviews for {movieName}</p>
      <Link to={`/reviews/${movieName}`}>
        <button type="submit">See all reviews</button>
      </Link>
    </div>
  );
}

export default Thanks;
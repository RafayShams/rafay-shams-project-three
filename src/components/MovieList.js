import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieDetails from "./MovieDetails";

function MovieList() {
  const { movieName } = useParams();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    axios({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      dataResponse: "json",
      params: {
        api_key: "c7d2bc1af674054e4cbfe886c8424b11",
        query: movieName,
        include_adult: "false",
      },
    }).then((res) => {
      setMovieList(res.data.results);
    });
  }, [movieName]);

  return (
    <div>
      {movieList.length === 0
      ? (
        <h3>No movie found</h3>
      )
      : (
        <ul className="gallery">
        {movieList.map((movie) => {
          return (
            <li>
               <MovieDetails
                key={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                synopsis={movie.overview}
                releaseDate={movie.release_date}
              />
            </li>
          );
        })}
      </ul>
      )}
    </div>
  );
}

export default MovieList;
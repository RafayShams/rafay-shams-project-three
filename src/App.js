//importing components
import ReviewForm from "./components/ReviewForm";
import MovieSearch from "./components/MovieSearch";
import MovieList from "./components/MovieList";
import ReviewList from "./components/ReviewList";
import Header from "./components/Header";
import Thanks from "./components/Thanks";
import { Routes, Route } from "react-router-dom";

import "./App.css";

//creating and exporting the App component
export default function App() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <MovieSearch />
        <Routes>
          <Route path="/movieSearch/:movieName" element={<MovieList />} />
          <Route path="/reviewForm/:movieName" element={<ReviewForm />} />
          <Route path="/reviews/:movieName" element={<ReviewList />} />
          <Route path="/Thanks/:movieName" element={<Thanks />} />
        </Routes>
      </div>
    </div>
  );
}
//importing components
import ReviewForm from "./components/ReviewForm";
import MovieSearch from "./components/MovieSearch";
import MovieList from "./components/MovieList";
import ReviewList from "./components/ReviewList";
import Header from "./components/Header";
import Thanks from "./components/Thanks";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

//importing stylesheet
import "./App.css";

//creating and exporting the App component
export default function App() {
  return (
    <>
      {/* Header and movieSearch component will stay on every page while the other
      components will show up on Routing */}
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
      <Footer />
    </>
  );
}
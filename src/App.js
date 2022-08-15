import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCart";
import "./App.css";
import searchIcon from "./search.svg";

const API_URL = process.env.REACT_APP_API;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieSearch</h1>
      <div className="search">
        <input
          type="text"
          placeholder="search for movies"
          value={movieTitle}
          onChange={(event) => {
            setMovieTitle(event.target.value);
          }}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => {
            searchMovies(movieTitle);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={Math.random() * 1000} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;

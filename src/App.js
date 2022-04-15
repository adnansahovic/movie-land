import React, { useState } from "react";
import { useEffect } from "react";

import './App.css';
import { BsSearch } from "react-icons/bs";
import MovieCard from "./MovieCard";



// a1dc6b78

const API_URL = "http://www.omdbapi.com?apikey=a1dc6b78";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      
      searchMovies(searchTerm)
    }
  }

  useEffect(()=>{
    searchMovies('');
  }, []);

  return (
    <div className="app">
     <h1>MovieLand</h1>
     
     <div className="search">
       <input 
       placeholder="Search for movies"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       onKeyDown={handleKeyDown} 
       />
      <BsSearch style={{cursor:'pointer'}} color="white" size="1.5rem" onClick={()=> searchMovies(searchTerm)}/>
     </div>

     {movies?.length > 0 
       ? (
          <div className="container">
             {movies.map((movie) => (
                <MovieCard movie={movie} />
         ))}
       </div>
       ) : (
         <div className="empty">
           <h2>No movies found</h2>
         </div>
       )}
    </div>
  );
}

export default App;

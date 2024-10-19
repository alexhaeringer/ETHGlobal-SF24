import React from "react";

function MovieList () {
    const movies = [
        { id: 1, title: 'Interstellar', year: 2010 },
        { id: 2, title: 'Mean Girls', year: 2004 }
    ]

    return (
        <div>
        <h2>Movies</h2>
        <ul>
            {movies.map((movie) => (
            <li key={movie.id}>
                {movie.title} ({movie.year})
            </li>
            ))}
        </ul>
        </div>
    );
}

export default MovieList;
import React from "react";

function MovieList () {
    const movies = [
        { id: 1, title: 'Dune 2', year: 2010, image: 'Dune2.jpeg' },
        { id: 2, title: 'Ex Machina', year: 2004, image: 'Exmachina.jpg' }
    ]

    return (
        <div style={{ color: 'white', fontFamily: 'Pixel-regular' }}>
            <h2>Movies</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {movies.map((movie) => (
                    <li key={movie.id} style={{ marginBottom: '20px' }}>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/${movie.image}`}
                            alt={movie.title}
                            style={{ width: '150px', height: 'auto', marginRight: '10px' }}
                        />
                        <div>
                            {movie.title} ({movie.year})
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;
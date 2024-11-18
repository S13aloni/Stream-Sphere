import React from 'react';
import './CubeM.css';

const CubeM = ({ movies }) => {
  const totalCubes = Math.ceil(movies.length / 6); // Calculate how many cubes are needed

  return (
    <div className='div-cube'>
      <h1>Most Watched Movies</h1>
    <div className="cube-container">
      {Array.from({ length: totalCubes }).map((_, cubeIndex) => (
        <div className="cube" key={cubeIndex}>
          {movies.slice(cubeIndex * 6, (cubeIndex + 1) * 6).map((movie, index) => (
            <div className={`cube-face face${index}`} key={movie.id}>
              <img src={movie.image} alt={movie.title} />
              <h4>{movie.title}</h4>
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
};

export default CubeM;

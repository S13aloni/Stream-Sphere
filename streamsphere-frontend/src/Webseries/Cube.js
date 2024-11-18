import React from 'react';
import './Cube.css';

const Cube = ({ webSeries }) => {
  const totalCubes = Math.ceil(webSeries.length / 6); // Calculate how many cubes are needed

  return (
    <div className='div-cube'>
      <h1>Most Watched Series</h1>
    <div className="cube-container">
      {Array.from({ length: totalCubes }).map((_, cubeIndex) => (
        <div className="cube" key={cubeIndex}>
          {webSeries.slice(cubeIndex * 6, (cubeIndex + 1) * 6).map((series, index) => (
            <div className={`cube-face face${index}`} key={series.id}>
              <img src={series.image} alt={series.title} />
              <h4>{series.title}</h4>
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Cube;

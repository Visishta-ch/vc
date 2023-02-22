

import React, { useState, useEffect } from 'react';
import styles from './Graph.module.css';

function Graph({ params }) {
  // const letters = '0123456789ABCDEF';
  // let color = '#';
  // console.log(params)
  const [positions, setPositions] = useState(
    params.map((param) => ({
      x: param.initial_position_X,
      y: param.initial_position_Y,
      speed:param.speed
    }))
  );
  const [directions, setDirections] = useState(
    params.map((param) => param.direction)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((positions) =>
        positions.map((position, i) => {
          const { speed } = params[i];
          
          let { x, y } = position;
          const direction = directions[i];

          if (direction === 'towards') {
            y -= speed;
            if (y < 0) {
              y = -y;
              setDirections((directions) =>
                directions.map((dir, j) => (i === j ? 'backwards' : dir))
              );
            }
          } else if (direction === 'backwards') {
            y += speed;
            if (y > 215) {
              y = 430 - y;
              setDirections((directions) =>
                directions.map((dir, j) => (i === j ? 'towards' : dir))
              );
            }
          } else if (direction === 'upwards') {
            x -= speed;
            if (x < 0) {
              x = -x;
              setDirections((directions) =>
                directions.map((dir, j) => (i === j ? 'downwards' : dir))
              );
            }
          } else if (direction === 'downwards') {
            x += speed;
            if (x > 570) {
              x = 1140 - x;
              setDirections((directions) =>
                directions.map((dir, j) => (i === j ? 'upwards' : dir))
              );
            }
          }

          return { x, y };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [positions, directions,params]);

  const cells = [];

  for (let i = 0; i < 6; i++) {
    // 6 rows
    // color += letters[Math.floor(Math.random() * 16)];
    for (let j = 0; j < 14; j++) {
      // 14 columns
      cells.push(
        <div className={styles.cell} key={i * 14 + j + 1}>
          {positions.map(
            (position, k) =>
              i === Math.floor(position.y / 36.5) &&
              j === Math.floor(position.x / 42.9) && (
                <div
                  className={styles.point}
                
                  key={k}
                >
                  p
                </div>
              )
          )}
        </div>
      );
    }
  }

  return <div className={styles.table}>{cells}</div>;
}

export default Graph;

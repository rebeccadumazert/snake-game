import React from 'react';
import { Row } from './Row';

export const Grid = ({ grid, snakePosition, snakeBody, applePosition }) => {
  console.log(snakePosition);
  return (
    <div>
      {grid.map((row, indexRow) => (
        <Row
          row={row}
          snakePosition={snakePosition}
          indexRow={indexRow}
          snakeBody={snakeBody}
          applePosition={applePosition}
        ></Row>
      ))}
    </div>
  );
};

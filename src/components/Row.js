import React from 'react';
import { Cell } from './Cell';

export const Row = ({
  row,
  snakePosition,
  indexRow,
  snakeBody,
  applePosition,
}) => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {row.map((cell, indexCol) => (
        <Cell
          cell={cell}
          snakePosition={snakePosition}
          indexRow={indexRow}
          indexCol={indexCol}
          snakeBody={snakeBody}
          applePosition={applePosition}
        ></Cell>
      ))}
    </div>
  );
};

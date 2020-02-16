import React from 'react';

const red = 'red';
const yellow = 'yellow';
const green = 'green';
const orange = 'orange';

function getColor({
  snakePosition,
  indexRow,
  indexCol,
  snakeBody,
  applePosition,
}) {
  const isHeadPosition =
    snakePosition.x === indexCol && snakePosition.y === indexRow && red;
  const isBodyPosition =
    snakeBody.some(
      position => position.x === indexCol && position.y === indexRow
    ) && orange;
  const isApple =
    applePosition.x === indexCol && applePosition.y === indexRow && yellow;

  return isHeadPosition || isBodyPosition || isApple || green;
}

export const Cell = ({
  snakePosition,
  indexRow,
  indexCol,
  snakeBody,
  applePosition,
}) => {
  const color = getColor({
    snakePosition,
    indexRow,
    indexCol,
    snakeBody,
    applePosition,
  });
  return (
    <div
      style={{
        border: 'solid 1px',
        flex: '0 0 50px',
        height: '50px',
        backgroundColor: color,
      }}
    ></div>
  );
};

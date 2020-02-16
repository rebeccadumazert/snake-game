import React, { Component } from 'react';
import { Grid } from './components/Grid';
const NB_CELL = 10;
// const default_state = 'playing';
const arrowUp = 'ArrowUp';
const arrowLeft = 'ArrowLeft';
const arrowDown = 'ArrowDown';
const arrowRight = 'ArrowRight';

export default class Game extends Component {
  state = {
    grid: Array(NB_CELL).fill(Array(NB_CELL).fill(0)),
    snakePosition: { x: 0, y: 0 },
    snakeBody: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    lastDirection: arrowRight,
    gameState: 'playing',
    applePosition: this.createApplePosition(),
    snakeSize: 2,
    appleCounter: 0,
    playGame: false,
    intervalID: '',
  };
  gridRef = null;

  componentDidMount() {
    this.gridRef.focus();
  }

  loopGame() {
    this.moveSnake();
    this.setState(this.isCollision);
    this.setState(this.checkApple);
  }

  playGame() {
    const intervalID = setInterval(() => {
      this.loopGame();
    }, 250);
    this.setState({
      intervalID: intervalID,
    });
  }
  
  breakGame() {
    clearInterval(this.state.intervalID);
  }

  createApplePosition() {
    const randomNb = Math.floor(Math.random() * NB_CELL);
    return {
      x: randomNb,
      y: randomNb,
    };
  }

  moveSnake() {
    this.setState(({ snakePosition, lastDirection, snakeBody, snakeSize }) => {
      const moveOnY =
        lastDirection === arrowUp ? -1 : lastDirection === arrowDown ? 1 : 0;
      const moveOnX =
        lastDirection === arrowLeft ? -1 : lastDirection === arrowRight ? 1 : 0;
      const newHeadPosition = {
        x: snakePosition.x + moveOnX,
        y: snakePosition.y + moveOnY,
      };
      const snakeHasGoodSize = snakeBody.length === snakeSize ? -1 : 0;
      const newBodyPositions = [
        snakePosition,
        ...snakeBody.slice(0, snakeBody.length + snakeHasGoodSize),
      ];
      return {
        snakePosition: newHeadPosition,
        snakeBody: newBodyPositions,
      };
    });
  }

  isCollision({ snakePosition, snakeBody }) {
    if (snakePosition.x < 0 || snakePosition.x >= NB_CELL) {
      return { gameState: 'loosing' };
    } else if (snakePosition.y < 0 || snakePosition.y >= NB_CELL) {
      return { gameState: 'loosing' };
    } else if (
      snakeBody.some(
        position =>
          position.x === snakePosition.x && position.y === snakePosition.y
      )
    ) {
      return { gameState: 'loosing' };
    }
  }

  checkApple({ snakePosition, applePosition, snakeSize, appleCounter }) {
    if (
      snakePosition.y === applePosition.y &&
      snakePosition.x === applePosition.x
    ) {
      return {
        applePosition: this.createApplePosition(),
        snakeSize: snakeSize + 1,
        appleCounter: appleCounter + 1,
      };
    }
  }
  replayGame() {
    // return { gameState: 'playing' };
  }

  onKeyEvent({ key }) {
    this.setState({ lastDirection: key });
  }
  render() {
    const {
      grid,
      snakePosition,
      snakeBody,
      gameState,
      applePosition,
    } = this.state;
    return (
      <div
        tabIndex="-1"
        onKeyDown={this.onKeyEvent.bind(this)}
        ref={el => (this.gridRef = el)}
      >
        {this.state.gameState === 'playing' && (
          <Grid
            grid={grid}
            snakePosition={snakePosition}
            snakeBody={snakeBody}
            gameState={gameState}
            applePosition={applePosition}
          ></Grid>
        )}
        <p>Votre snake a mangé {this.state.appleCounter} pomme(s)</p>
        <button onClick={this.playGame.bind(this)}>PLAY</button>
        <button onClick={this.breakGame.bind(this)}>BREAK</button>
        <button onClick={this.replayGame.bind(this)}>REPLAY</button>
        {this.state.gameState === 'loosing' && (
          <img
            style={{ height: '100vh', width: '100vw' }}
            src="https://st2.depositphotos.com/1396922/8164/v/600/depositphotos_81648054-stock-video-game-over-on-jumbotron-screen.jpg"
            alt="gameOver"
          />
        )}
      </div>
    );
  }
}

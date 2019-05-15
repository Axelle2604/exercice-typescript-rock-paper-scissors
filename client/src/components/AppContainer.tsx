import React, { Component } from 'react';
import ImgContainer from './ImgContainer';
import Ui from './Ui';
import { IElement } from '../utils/types';
import { postPlayerTurn } from '../services/calls';
import { ElementContainer } from './styled/uiElementStyled';
import { rock, paper, scissors, victoryCombinaison } from '../utils/data';

const PLAYER: string = 'PLAYER';
const OPPONENT: string = 'OPPONENT';

interface IProps {}

interface IState {
  elementPlayed: IElement;
  opponentElemPlayed: IElement;
  playerScore: number;
  opponentScore: number;
  timer: number;
  gameStarted: boolean;
  hasPlayed: boolean;
  now: number;
}

interface IPlayersScore {
  playerScore: number;
  opponentScore: number;
}

const incrementScore = (playerToIncrement: string) => ({
  playerScore,
  opponentScore,
}: IPlayersScore) => {
  if (playerToIncrement === PLAYER) {
    return { playerScore: playerScore + 1, opponentScore };
  } else {
    return { opponentScore: opponentScore + 1, playerScore };
  }
};

const incrementTimer = (now: number) => ({ timer }: { timer: number }) => ({
  timer: Math.floor((now - Date.now()) / 1000 + 3),
});

export default class AppContainer extends Component<IProps, IState> {
  state = {
    elementPlayed: { img: '', title: '' },
    opponentElemPlayed: { img: '', title: '' },
    playerScore: 0,
    opponentScore: 0,
    timer: 0,
    gameStarted: false,
    hasPlayed: false,
    now: 0,
  };

  intervalId: number | undefined = undefined;

  setPlayedElement = (element: IElement) => {
    this.setState(
      { elementPlayed: element, hasPlayed: true },
      this.getOpponentPlay
    );
  };

  getOpponentPlay = async () => {
    const { value: number } = await postPlayerTurn(
      this.state.elementPlayed.title
    );
    const opponentShot = number === 0 ? rock : number === 1 ? paper : scissors;
    this.setState({ opponentElemPlayed: opponentShot }, this.checkWinner);
  };

  startGame = () => {
    const { gameStarted } = this.state;
    !gameStarted &&
      this.setState({ gameStarted: true }, () => this.startCountDown());
  };

  checkWinner = () => {
    const {
      elementPlayed: { title: elemPlayer },
      opponentElemPlayed: { title: elemOpponent },
    } = this.state;
    victoryCombinaison(elemPlayer, elemOpponent) === 'defeat' &&
      this.setState(incrementScore(OPPONENT));
    victoryCombinaison(elemPlayer, elemOpponent) === 'victory' &&
      this.setState(incrementScore(PLAYER));
    victoryCombinaison(elemPlayer, elemOpponent) === 'egality' &&
      this.setState(incrementScore(PLAYER));

    this.otherTurn();
  };

  otherTurn = () => {
    this.clearCountDown();
    this.setState({
      elementPlayed: { img: '', title: '' },
      opponentElemPlayed: { img: '', title: '' },
      hasPlayed: false,
    });
    this.startCountDown();
  };

  startCountDown = () => {
    const { timer, elementPlayed, now } = this.state;
    this.setState({ now: Date.now() }, () => {
      this.intervalId = setInterval(this.timerIncrement, 100);
    });
  };

  timerIncrement = () => {
    const { hasPlayed, now } = this.state;
    this.setState(incrementTimer(now));
    if (this.state.timer <= 0) {
      if (!hasPlayed) {
        this.setState(incrementScore(OPPONENT));
        this.clearCountDown();
      } else {
        this.clearCountDown();
      }
      return this.otherTurn();
    }
  };

  clearCountDown = () => {
    clearInterval(this.intervalId);
  };

  render() {
    const {
      elementPlayed: { img: playerImg, title: playerTitle },
      opponentElemPlayed: { img: opponentImg, title: opponentTitle },
      gameStarted,
      timer,
      hasPlayed,
      playerScore,
      opponentScore,
    } = this.state;
    const beginGame = !gameStarted && (
      <button onClick={this.startGame}>Start</button>
    );
    const gameInterface = (
      <div>
        <div>{timer}</div>
        <div>
          <h3>Player</h3>
          <div>Score : {playerScore}</div>
          <ImgContainer img={playerImg} title={playerTitle} />
        </div>
        <div>
          <h3>Opponent</h3>
          <div>Score : {opponentScore}</div>
          <ImgContainer img={opponentImg} title={opponentTitle} />
        </div>
        <Ui setPlayedElement={this.setPlayedElement} hasPlayed={hasPlayed} />
      </div>
    );
    return <div>{beginGame || gameInterface}</div>;
  }
}

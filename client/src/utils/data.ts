import { IElement } from './types';

export const scissors: IElement = {
  img: 'far fa-hand-scissors',
  title: 'Scissors',
};

export const rock: IElement = {
  img: 'far fa-hand-rock',
  title: 'Rock',
};

export const paper: IElement = {
  img: 'far fa-hand-paper',
  title: 'Paper',
};

export const victoryCombinaison = (
  playerShot: string,
  opponentShot: string
) => {
  if (playerShot === 'Scissors') return scissorsCombinaisons(opponentShot);
  if (playerShot === 'Paper') return paperCombinaisons(opponentShot);
  if (playerShot === 'Rock') return rockCombinaisons(opponentShot);
};

const scissorsCombinaisons = (opponentShot: string) => {
  if (opponentShot === 'Scissors') return 'egality';
  if (opponentShot === 'Paper') return 'victory';
  if (opponentShot === 'Rock') return 'defeat';
};

const paperCombinaisons = (opponentShot: string) => {
  if (opponentShot === 'Scissors') return 'defeat';
  if (opponentShot === 'Paper') return 'egality';
  if (opponentShot === 'Rock') return 'victory';
};

const rockCombinaisons = (opponentShot: string) => {
  if (opponentShot === 'Scissors') return 'victory';
  if (opponentShot === 'Paper') return 'defeat';
  if (opponentShot === 'Rock') return 'egality';
};

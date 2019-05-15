export const randomNumber = (number: number) => {
  return Math.floor(Math.random() * Math.floor(number));
};

const playersShotsTab: string[] = [];

export const addToPlayersShotsTab = (elemPlayed: string) => {
  return playersShotsTab.push(elemPlayed);
};

interface IOccurences {
  [key: string]: number;
}

export const checkMostUsedElem = () => {
  const shotsTab = playersShotsTab.slice(-5);
  const ocurrencesList = shotsTab.reduce(
    (occurences: IOccurences, value: string): IOccurences => {
      return {
        ...occurences,
        [value]: occurences[value] + 1,
      } as IOccurences;
    },
    {
      Rock: 0,
      Paper: 0,
      Scissors: 0,
    }
  );
  const occTab: number[] = Object.values(ocurrencesList);
  const indexHigherNumber = occTab.indexOf(getHigherNumber(occTab));
  return indexHigherNumber;
};

const getHigherNumber = (numbers: number[]) => {
  return Math.max(...numbers);
};

export const opponentPlays = () => {
  if (checkMostUsedElem() === 0) {
    return 1;
  }
  if (checkMostUsedElem() === 1) {
    return 2;
  }
  if (checkMostUsedElem() === 2) {
    return 0;
  }
};

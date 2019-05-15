import axios from 'axios';

export const postPlayerTurn = async (elemPlayed: any) => {
  console.log(elemPlayed);
  try {
    const { data: randomNumber } = await axios.post('/userTurn', {
      elemPlayed,
    });
    return randomNumber;
  } catch (e) {
    console.error(e);
  }
};

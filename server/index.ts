import express from 'express';
import bodyParser from 'body-parser';
import {
  randomNumber,
  addToPlayersShotsTab,
  checkMostUsedElem,
  opponentPlays,
} from './utils/utils';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/userTurn', (req, res) => {
  const { elemPlayed } = req.body;
  addToPlayersShotsTab(elemPlayed);
  res.json({ value: opponentPlays() });
});

app.listen(8080, () => console.log('Server started.'));

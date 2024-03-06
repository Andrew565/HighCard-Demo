import {baseDeck} from '@andrewcreated/deck-of-cards.js';
import {Standard52Card} from '@andrewcreated/deck-of-cards.js/dist/standard52CardsAndJokers';

function prompt(question: string, callback: (input: string) => void) {
  const stdin = process.stdin,
    stdout = process.stdout;

  stdin.resume();
  stdout.write(question);

  stdin.once('data', data => {
    callback(data.toString().trim());
  });
}

baseDeck.shuffle(1);
const oneThirdOfCards = Math.floor(baseDeck.drawPile.length / 3);

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const integerRange: {[x: string]: number[]} = {
  t: [0, oneThirdOfCards],
  m: [oneThirdOfCards, oneThirdOfCards * 2],
  b: [oneThirdOfCards * 2, oneThirdOfCards * 3],
};

const getRandomIndex = (input: string) => {
  const [min, max] = integerRange[input];
  const randomIndex = getRndInteger(min, max);
  return randomIndex;
};

const getComputerCard = (): Standard52Card => {
  const tmb = ['t', 'm', 'b'][Math.floor(Math.random() * 3)];
  const randomIndex = getRandomIndex(tmb);
  return baseDeck.drawPile[randomIndex];
};

prompt(
  'Would you like to draw a card from the top, middle, or bottom? Type t, m, or b: ',
  input => {
    const randomIndex = getRandomIndex(input);
    const randomCard = baseDeck.drawPile[randomIndex];
    console.log('Your card: ', randomCard.name);
    const randomComputerCard = getComputerCard();
    console.log("The computer's card: ", randomComputerCard.name);

    const determineWinnerText = (
      playerCard: Standard52Card,
      computerCard: Standard52Card
    ) => {
      let winnerText = '';
      if (playerCard.numberRank === computerCard.numberRank) {
        winnerText = 'Tied!';
      } else if (playerCard.numberRank > computerCard.numberRank) {
        winnerText = 'You won!';
      } else {
        winnerText = 'Sorry, you lose this time.';
      }
      return winnerText;
    };

    const winnerText = determineWinnerText(randomCard, randomComputerCard);
    console.log('\n', winnerText);
    // eslint-disable-next-line no-process-exit
    process.exit();
  }
);

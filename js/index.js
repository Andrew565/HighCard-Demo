"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deck_of_cards_js_1 = require("@andrewcreated/deck-of-cards.js");
function prompt(question, callback) {
    const stdin = process.stdin, stdout = process.stdout;
    stdin.resume();
    stdout.write(question);
    stdin.once('data', data => {
        callback(data.toString().trim());
    });
}
deck_of_cards_js_1.baseDeck.shuffle(1);
const oneThirdOfCards = Math.floor(deck_of_cards_js_1.baseDeck.drawPile.length / 3);
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const integerRange = {
    t: [0, oneThirdOfCards],
    m: [oneThirdOfCards, oneThirdOfCards * 2],
    b: [oneThirdOfCards * 2, oneThirdOfCards * 3],
};
const getRandomIndex = (input) => {
    const [min, max] = integerRange[input];
    const randomIndex = getRndInteger(min, max);
    return randomIndex;
};
const getComputerCard = () => {
    const tmb = ['t', 'm', 'b'][Math.floor(Math.random() * 3)];
    const randomIndex = getRandomIndex(tmb);
    return deck_of_cards_js_1.baseDeck.drawPile[randomIndex];
};
prompt('Would you like to draw a card from the top, middle, or bottom? Type t, m, or b: ', input => {
    const randomIndex = getRandomIndex(input);
    const randomCard = deck_of_cards_js_1.baseDeck.drawPile[randomIndex];
    console.log('Your card: ', randomCard.name);
    const randomComputerCard = getComputerCard();
    console.log("The computer's card: ", randomComputerCard.name);
    const determineWinnerText = (playerCard, computerCard) => {
        let winnerText = '';
        if (playerCard.numberRank === computerCard.numberRank) {
            winnerText = 'Tied!';
        }
        else if (playerCard.numberRank > computerCard.numberRank) {
            winnerText = 'You won!';
        }
        else {
            winnerText = 'Sorry, you lose this time.';
        }
        return winnerText;
    };
    const winnerText = determineWinnerText(randomCard, randomComputerCard);
    console.log('\n', winnerText);
    // eslint-disable-next-line no-process-exit
    process.exit();
});
//# sourceMappingURL=index.js.map
import type { Card } from "./Card";
import { getCardsShuffled } from "./GameplayCardFunctions";
import type { WarDeque } from "./WarDeque";

function playCards(player1Deck: Card[], player2Deck: Card[], warDeque: WarDeque, playFaceUp: boolean = true): void {

    if (player1Deck.length > 0) {

      let player1TopCard = player1Deck.shift()!;
      player1TopCard.isFaceUp = playFaceUp;
      warDeque.deque.unshift(player1TopCard);
      ++warDeque.player1Length;
    }

    if (player2Deck.length > 0) {

      let player2TopCard = player2Deck.shift()!;
      player2TopCard.isFaceUp = playFaceUp;
      warDeque.deque.push(player2TopCard);
      ++warDeque.player2Length;
    }
}

function handleWar(player1Deck: Card[], player2Deck: Card[], warDeque: WarDeque): void {

    if (warDeque.deque.length === 0) {
        return;
    }

    let player1BattleCard: Card = warDeque.deque[0];
    let player2BattleCard: Card = warDeque.deque[warDeque.deque.length - 1];

    if (player1BattleCard.value !== player2BattleCard.value) {

        (player1BattleCard.value > player2BattleCard.value ? player1Deck : player2Deck).push(...getCardsShuffled(warDeque.deque));
        warDeque.deque.splice(0, warDeque.deque.length);

    } else if (player1Deck.length === 0 && player2Deck.length === 0) {

        // In the case that all cards are played and there's still a tie, we shuffle all the cards back to their respective decks

        player1Deck.push(...getCardsShuffled(warDeque.deque.slice(0, warDeque.player1Length)));
        player2Deck.push(...getCardsShuffled(warDeque.deque.slice(warDeque.player1Length)));
        warDeque.deque.splice(0, warDeque.deque.length);

    } else {

        playCards(player1Deck, player2Deck, warDeque, false);
    }
}

const isGameEnd = (player1Deck: Card[], player2Deck: Card[], warDeque: WarDeque) => (player1Deck.length === 0 || player2Deck.length === 0) && warDeque.deque.length === 0;

export { playCards, handleWar, isGameEnd }

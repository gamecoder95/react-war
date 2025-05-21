import type { Card } from "./Card";
import { shuffleWarSpoils } from "./GameplayHelperFunctions";

function playCards(player1Deck: Card[], player2Deck: Card[], warDeque: Card[], playFaceUp: boolean = true): void {

    if (player1Deck.length > 0) {

      let player1TopCard = player1Deck.shift()!;
      player1TopCard.isFaceUp = playFaceUp;
      warDeque.unshift(player1TopCard);
    }

    if (player2Deck.length > 0) {

      let player2TopCard = player2Deck.shift()!;
      player2TopCard.isFaceUp = playFaceUp;
      warDeque.push(player2TopCard);
    }
}

function handleWar(player1Deck: Card[], player2Deck: Card[], warDeque: Card[]): void {

    if (player1Deck.length === 0 || player2Deck.length === 0 || warDeque.length === 0) {
        return;
    }

    let player1BattleCard: Card = warDeque[0];
    let player2BattleCard: Card = warDeque[warDeque.length - 1];

    if (player1BattleCard.value !== player2BattleCard.value) {

        (player1BattleCard.value > player2BattleCard.value ? player1Deck : player2Deck).push(...shuffleWarSpoils(warDeque));
        warDeque.splice(0, warDeque.length);

    } else {

        playCards(player1Deck, player2Deck, warDeque, false);
    }
}

const isGameEnd = (player1Deck: Card[], player2Deck: Card[], warDeque: Card[]) => (player1Deck.length === 0 || player2Deck.length === 0) && warDeque.length === 0;


export { playCards, handleWar, isGameEnd }

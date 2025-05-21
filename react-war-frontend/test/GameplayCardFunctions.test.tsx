import { beforeEach, describe, expect, it } from "@jest/globals";
import { dealDeckToTwoPlayers, generateShuffledDeck, getCardsShuffled } from '../src/gameplay/GameplayCardFunctions';
import { Card, CardValues } from "../src/gameplay/Card";
import { getDummyDeck } from "./TestUtils";

describe('Generate shuffled deck of cards', () => {

    let shuffledDeck: Card[] = [];

    beforeEach(() => { 
        shuffledDeck = generateShuffledDeck();
    });

    it('contains 52 cards in total', () => {
        expect(shuffledDeck.length).toBe(52);
    });

    it('contains 4 of each type of card', () => {

        // Arrange
        const cardMap = new Map();
        for (const value of Object.values(CardValues)) {
            cardMap.set(value, 0);
        }

        // Act
        shuffledDeck.forEach(card => cardMap.set(card.value, cardMap.get(card.value) + 1));

        // Assert
        for (const [cardKey, cardCount] of cardMap) {
            expect(cardCount).toBe(4);
        }
    });

    it('is generated with all cards face down', () => {
        shuffledDeck.forEach(card => expect(card.isFaceUp).toBe(false));
    });

    // Note: there is a possibility that two generated shuffled decks to be exactly equal, however
    // the chances of that are so minute that we can assume with confidence that two randomly shuffled decks
    // are never equal.
    it('is different than another, newly generated shuffled deck', () => {
        const otherShuffledDeck = generateShuffledDeck();

        expect(shuffledDeck).not.toEqual(otherShuffledDeck);
    });
});

describe('Deal a deck of cards to 2 players', () => {

    it('returns two equal decks of cards exactly in half', () => {
        const deck = generateShuffledDeck();
        const [deck1, deck2] = dealDeckToTwoPlayers(deck);

        expect(deck1.length).toBe(deck2.length);
        expect(deck1.length).toBe(Math.floor(deck.length / 2));
    });

    it('accounts for an odd numbered deck by having the first deck with an additional card', () => {
        const deck = getDummyDeck();
        const [deck1, deck2] = dealDeckToTwoPlayers(deck);

        expect(deck1.length).toBe(deck2.length + 1);
    })
});

describe('Shuffle a pile of cards of any size', () => {

    let cards: Card[] = [];

    beforeEach(() => {
        cards = getDummyDeck();
    });

    it('returns a randomly rearranged list of the same cards', () => {
        
        const shuffledCards = getCardsShuffled(cards);

        expect(shuffledCards.length).toBe(cards.length);
        expect(shuffledCards).not.toEqual(cards);
    });

});
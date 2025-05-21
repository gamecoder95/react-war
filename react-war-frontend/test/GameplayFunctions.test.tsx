import { beforeEach, describe, expect, it } from "@jest/globals";
import { Card, CardValues } from "../src/gameplay/Card";
import { WarDeque } from "../src/gameplay/WarDeque";
import { getCardsShuffled } from "../src/gameplay/GameplayCardFunctions";
import { handleWar, isGameEnd, playCards } from "../src/gameplay/GameplayFunctions";
import { getDummyDeck } from "./TestUtils";


describe('Execute the play cards step of the game', () => {

    let player1Deck: Card[] = [];
    let player2Deck: Card[] = [];
    let warDeque: WarDeque = {deque: [], player1Length: 0, player2Length: 0};

    beforeEach(() => {
        player1Deck = getCardsShuffled(getDummyDeck());
        player2Deck = getCardsShuffled(getDummyDeck());
        warDeque = {deque: [], player1Length: 0, player2Length: 0};
    });

    it('updates the wardeque correctly with 1 played card each', () => {
        
        const player1TopCard = player1Deck[0];
        const player2TopCard = player2Deck[0];
        const player1DeckLength = player1Deck.length;
        const player2DeckLength = player2Deck.length;

        playCards(player1Deck, player2Deck, warDeque);

        expect(player1Deck.length).toBe(player1DeckLength - 1);
        expect(player2Deck.length).toBe(player2DeckLength - 1);
        expect(warDeque.deque.length).toBe(2);
        expect(warDeque.deque[0]).toBe(player1TopCard); // not strict equality as we want to test the reference equality
        expect(warDeque.deque[warDeque.deque.length - 1]).toBe(player2TopCard);
        expect(warDeque.player1Length).toBe(1);
        expect(warDeque.player2Length).toBe(1);
    });

    it('can play the cards face up', () => {

        playCards(player1Deck, player2Deck, warDeque); // default is to play the cards face up (i.e. true)

        expect(warDeque.deque[0].isFaceUp).toBe(true);
        expect(warDeque.deque[warDeque.deque.length - 1].isFaceUp).toBe(true);
    });


    it('can play the cards face down', () => {

        playCards(player1Deck, player2Deck, warDeque, false);

        expect(warDeque.deque[0].isFaceUp).toBe(false);
        expect(warDeque.deque[warDeque.deque.length - 1].isFaceUp).toBe(false);
    });

    it('will not modify the war deque when called on empty decks', () => {

        let warDequeLength = warDeque.deque.length;
        player1Deck = [];
        player2Deck = [];

        playCards(player1Deck, player2Deck, warDeque);

        expect(warDeque.deque.length).toBe(warDequeLength); 
    });

    it('can handle playing cards from only one deck (player 1)', () => {
        
        // Remove all but 2 cards of player 1's deck
        while (player2Deck.length > 2) {
            player2Deck.pop();
        }
        let player1DeckLength = player1Deck.length;

        playCards(player1Deck, player2Deck, warDeque);
        playCards(player1Deck, player2Deck, warDeque);
        playCards(player1Deck, player2Deck, warDeque);
        playCards(player1Deck, player2Deck, warDeque);

        expect(warDeque.deque.length).toBe(6); // First 2 plays are 2 cards each, next 2 plays from player 2 only
        expect(warDeque.player1Length).toBe(4);
        expect(warDeque.player2Length).toBe(2);
        expect(player1Deck.length).toBe(player1DeckLength - warDeque.player1Length);
        expect(player2Deck.length).toBe(0);
    });

    it('can handle playing cards from only one deck (player 2)', () => {
        
        // Remove all but 2 cards of player 1's deck
        while (player1Deck.length > 2) {
            player1Deck.pop();
        }
        let player2DeckLength = player2Deck.length;

        playCards(player1Deck, player2Deck, warDeque);
        playCards(player1Deck, player2Deck, warDeque);
        playCards(player1Deck, player2Deck, warDeque);
        playCards(player1Deck, player2Deck, warDeque);

        expect(warDeque.deque.length).toBe(6); // First 2 plays are 2 cards each, next 2 plays from player 2 only
        expect(warDeque.player1Length).toBe(2);
        expect(warDeque.player2Length).toBe(4);
        expect(player1Deck.length).toBe(0);
        expect(player2Deck.length).toBe(player2DeckLength - warDeque.player2Length);

    });
});

describe('Execute the battle/war step of the game', () => {

    let player1Deck: Card[] = [];
    let player2Deck: Card[] = [];
    let player1DeckLength = 0;
    let player2DeckLength = 0;
    let warDeque: WarDeque = {deque: [], player1Length: 0, player2Length: 0};

    beforeEach(() => {
        player1Deck = getDummyDeck();
        player2Deck = getDummyDeck();
        player1DeckLength = player1Deck.length;
        player2DeckLength = player2Deck.length;
        warDeque = {deque: [], player1Length: 0, player2Length: 0};
    });

    it('Will not be executed on an empty war deque', () => {

        let warDequeLength = warDeque.deque.length;

        handleWar(player1Deck, player2Deck, warDeque);

        expect(player1Deck.length).toBe(player1DeckLength);
        expect(player2Deck.length).toBe(player2DeckLength);
        expect(warDeque.deque.length).toBe(warDequeLength);
    });

    it('will add the war deque cards to the deck of the player with the higher number (player 1)', () => {

        // Ace is the top card of the generated deck
        // See getDummyDeck() in TestUtils
        let player2TopCard = player2Deck[0] = {value: CardValues.Two, isFaceUp: false};
        
        playCards(player1Deck, player2Deck, warDeque);
        handleWar(player1Deck, player2Deck, warDeque);

        expect(player1Deck.length).toBeGreaterThan(player2Deck.length);
        expect(player1Deck.length).toBe(player1DeckLength + 1);
        expect(player2Deck.length).toBe(player2DeckLength - 1);

        expect(warDeque.deque.length).toBe(0);
        expect(warDeque.player1Length).toBe(0);
        expect(warDeque.player2Length).toBe(0);

        expect(player1Deck).toContain(player2TopCard);
        expect(player2Deck).not.toContain(player2TopCard);
    });

    it('will add the war deque cards to the deck of the player with the higher number (player 2)', () => {

        // Ace is the top card of the generated deck
        // See getDummyDeck() in TestUtils
        let player1TopCard = player1Deck[0] = {value: CardValues.Two, isFaceUp: false};
        
        playCards(player1Deck, player2Deck, warDeque);
        handleWar(player1Deck, player2Deck, warDeque);

        expect(player2Deck.length).toBeGreaterThan(player1Deck.length);
        expect(player1Deck.length).toBe(player1DeckLength - 1);
        expect(player2Deck.length).toBe(player2DeckLength + 1);

        expect(warDeque.deque.length).toBe(0);
        expect(warDeque.player1Length).toBe(0);
        expect(warDeque.player2Length).toBe(0);

        expect(player1Deck).not.toContain(player1TopCard);
        expect(player2Deck).toContain(player1TopCard);
    });

    it('will play an additional face down card from each deck on a tie', () => {

        // Both dummy decks in the initialization are the exact same cards in the same order
        let player1FirstTwoCards = [...player1Deck.slice(0, 2)];
        let player2FirstTwoCards = [...player2Deck.slice(0, 2)];

        playCards(player1Deck, player2Deck, warDeque);
        handleWar(player1Deck, player2Deck, warDeque);

        expect(player1Deck.length).toBe(player1DeckLength - 2);
        expect(player2Deck.length).toBe(player2DeckLength - 2);
        
        expect(warDeque.deque.length).toBe(4);
        expect(warDeque.player1Length).toBe(2);
        expect(warDeque.player2Length).toBe(2);


        player1FirstTwoCards.forEach(card => {
            expect(warDeque.deque).toContain(card);
            expect(player1Deck).not.toContain(card);
        });

        player2FirstTwoCards.forEach(card => {
            expect(warDeque.deque).toContain(card);
            expect(player2Deck).not.toContain(card);
        });
    });

    it('will grant the winner all the cards from previous card plays (player 1)', () => {

        // Two is the third card of the generated deck
        // See getDummyDeck() in TestUtils
        player1Deck[2] = {value: CardValues.Ace, isFaceUp: false};
        let player1FirstThreeCards = [...player1Deck.slice(0, 3)];
        let player2FirstThreeCards = [...player2Deck.slice(0, 3)];
        
        playCards(player1Deck, player2Deck, warDeque);
        handleWar(player1Deck, player2Deck, warDeque);
        playCards(player1Deck, player2Deck, warDeque);
        handleWar(player1Deck, player2Deck, warDeque);

        expect(player1Deck.length).toBe(player1DeckLength + 3);
        expect(player2Deck.length).toBe(player2DeckLength - 3);
        
        expect(warDeque.deque.length).toBe(0);
        expect(warDeque.player1Length).toBe(0);
        expect(warDeque.player2Length).toBe(0);

        player1FirstThreeCards.forEach(card => {
            expect(player1Deck).toContain(card);
        });

        player2FirstThreeCards.forEach(card => {
            expect(player1Deck).toContain(card);
            expect(player2Deck).not.toContain(card);
        });
    });

    it('will grant the winner all the cards from previous card plays (player 2)', () => {

        // Two is the third card of the generated deck
        // See getDummyDeck() in TestUtils
        player2Deck[2] = {value: CardValues.Ace, isFaceUp: false};
        let player1FirstThreeCards = [...player1Deck.slice(0, 3)];
        let player2FirstThreeCards = [...player2Deck.slice(0, 3)];
        
        playCards(player1Deck, player2Deck, warDeque);
        handleWar(player1Deck, player2Deck, warDeque);
        playCards(player1Deck, player2Deck, warDeque);
        handleWar(player1Deck, player2Deck, warDeque);

        expect(player2Deck.length).toBe(player2DeckLength + 3);
        expect(player1Deck.length).toBe(player1DeckLength - 3);
        
        expect(warDeque.deque.length).toBe(0);
        expect(warDeque.player1Length).toBe(0);
        expect(warDeque.player2Length).toBe(0);

        player1FirstThreeCards.forEach(card => {
            expect(player2Deck).toContain(card);
            expect(player1Deck).not.toContain(card);
        });

        player2FirstThreeCards.forEach(card => {
            expect(player2Deck).toContain(card);
        });
    });

    it('will reshuffle the war deque to each player when tying until both decks run out', () => {
        // Both dummy decks in the initialization are the exact same cards in the same order

        let cardsInDecks = [...player1Deck];

        for (let i = player1DeckLength; i >= 0; i -= 2) {
            playCards(player1Deck, player2Deck, warDeque);
            handleWar(player1Deck, player2Deck, warDeque);
        }

        expect(player1Deck.length).toBe(player1DeckLength);
        expect(player2Deck.length).toBe(player2DeckLength);

        expect(player1Deck).not.toEqual(cardsInDecks);
        expect(player2Deck).not.toEqual(cardsInDecks);

        expect(warDeque.deque.length).toBe(0);
        expect(warDeque.player1Length).toBe(0);
        expect(warDeque.player2Length).toBe(0);

        cardsInDecks.forEach(card => {
            expect(player1Deck).toContainEqual(card);
            expect(player2Deck).toContainEqual(card);
            expect(warDeque.deque).not.toContain(card);
        });
    });
})

describe('Test for the game\'s end', () => {

    let player1Deck: Card[] = [];
    let player2Deck: Card[] = [];
    let player1DeckLength = 0;
    let player2DeckLength = 0;
    let warDeque: WarDeque = {deque: [], player1Length: 0, player2Length: 0};

    beforeEach(() => {
        player1Deck = getDummyDeck();
        player2Deck = getDummyDeck();
        player1DeckLength = player1Deck.length;
        player2DeckLength = player2Deck.length;
        warDeque = {deque: [], player1Length: 0, player2Length: 0};
    });

    it('will return false if the war deque is not empty', () => {

        // Put cards in warDeque
        playCards(player1Deck, player2Deck, warDeque);
        handleWar(player1Deck, player2Deck, warDeque);
        // then artifically clear the player decks
        player1Deck = [];
        player2Deck = [];

        let gameEnd = isGameEnd(player1Deck, player2Deck, warDeque);

        expect(gameEnd).toBe(false);
    });

    it('will return false if all parameters are empty', () => {

        player1Deck = [];
        player2Deck = [];

        let gameEnd = isGameEnd(player1Deck, player2Deck, warDeque);

        expect(gameEnd).toBe(false);
    });

    it('will return true if one of the decks is empty and the other is not (player 1)', () => {

        player2Deck = [];

        let gameEnd = isGameEnd(player1Deck, player2Deck, warDeque);

        expect(gameEnd).toBe(true);
    });

    it('will return true if one of the decks is empty and the other is not (player 2)', () => {

        player1Deck = [];

        let gameEnd = isGameEnd(player1Deck, player2Deck, warDeque);

        expect(gameEnd).toBe(true);
    });
});
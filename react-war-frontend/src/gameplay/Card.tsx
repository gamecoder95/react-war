const CardValues = {
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 11,
    Queen: 12,
    King: 13,
    Ace: 100
} as const;

type CardValue = typeof CardValues[keyof typeof CardValues];

// NOTE: did not include suit as War is suit-agnostic.
// I intended to add it later for styling, however I ran out of time.
type Card = {
    value: CardValue,
    isFaceUp: boolean
};

export { CardValues };
export type { CardValue, Card };


function PlayerDeck({deck}: {deck: number[]}) {

    return (
        <div className="playerDeck">
            <h3>{deck.length}</h3>
        </div>
    );
}

export default PlayerDeck;
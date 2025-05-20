

function RevealButton({ onReveal } : {onReveal: () => void}) {
    return (
        <button onClick={() => onReveal}>Reveal!</button>
    );
}

export default RevealButton;
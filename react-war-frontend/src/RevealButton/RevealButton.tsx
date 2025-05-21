

function RevealButton({ onReveal, disabled } : {onReveal: () => void, disabled: boolean}) {
    return (
        <button disabled={disabled} onClick={() => onReveal()}>Reveal!</button>
    );
}

export default RevealButton;
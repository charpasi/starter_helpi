import "./Question.css";

function Question() {
    return (
        <header className="Question">
            <h2>Question:</h2>
            <div style={ {border: '1px solid purple', padding: '4px'} }>
                *insert question text here*
            </div>
        </header>
    );
}

export default Question;
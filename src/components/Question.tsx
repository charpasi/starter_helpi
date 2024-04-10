import { Button } from "react-bootstrap";
import "./Question.css";
import React, { useState } from 'react';


export function Question(): JSX.Element {
    const [questions, setQuestions] = useState<string[]>(["What moral values are most important to you in your career?", 
    "What extracurricular activities or hobbies do you enjoy in your free time?", "What subjects or topics do you excel at in school or work?"]);
    const [index, setIndex] = useState(0);

    const nextClick = () => {
        if (index < questions.length - 1 ){
            setIndex(index + 1);
        }
        else {
            setIndex(index);
        }
    }
    const previousClick = () => {
        if (index > 0 && index < questions.length){
            setIndex(index - 1);
        }
        else {
            setIndex(index);
        }
    }
    return (
        <header className="Question"> 
            <h2>Question:</h2>
            <div style={ {border: '1px solid purple', padding: '4px'} }>
                <p>{ questions[index] }</p>
            </div>
            <Button onClick={previousClick} disabled={index === 0}>Previous</Button>
            <Button onClick={nextClick} disabled={index === questions.length - 1}>Next</Button>
            <Button onClick={nextClick} disabled={index !== questions.length - 1}>Finish</Button>
        </header>
    );
}

export default Question;
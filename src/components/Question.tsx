import { Button } from "react-bootstrap";
import "./Question.css";
import React, { useState } from 'react';
import { detailedQuestions } from './QuestionArrays';


export function Question(): JSX.Element {
    const [questions, setQuestions] = useState<string[]>(detailedQuestions);
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
        <div className="Question"> 
            <h2>Question {index + 1}:</h2>
            <div style={ {border: '1px solid purple', padding: '4px'} }>
                <p>{ questions[index] }</p>
            </div>
            <Button onClick={previousClick} disabled={index === 0}>Previous</Button>
            <Button onClick={nextClick} disabled={index === questions.length - 1}>Next</Button>
            <Button onClick={nextClick} disabled={index !== questions.length - 1}>Finish</Button>
        </div>
    );
}

export default Question;
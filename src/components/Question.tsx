import { Button, Col, Form, Row } from "react-bootstrap";
import "./Question.css";
import React, { useState } from 'react';
import { detailedQuestions } from './QuestionArrays';
import ProgressBar from './ProgressBar';

export function Question(): JSX.Element {
    const [questions] = useState<string[]>(detailedQuestions);
    const [index, setIndex] = useState(0);
    const [text, setText] = useState<string>('Enter response here');
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
            <ProgressBar current={index + 1} max={questions.length} />
            <h2>Question {index + 1}:</h2>
            <div className="question-container">
                <p>{ questions[index] }</p>
            </div>
            <Form.Group controlId="formTextInput" as={Row} >
                <Form.Label column sm={2}></Form.Label>
                <Col>
                <Form.Control
                value={text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setText(event.target.value)} 
                className = "text-input-box"/>
                </Col>
            </Form.Group>
            <div className="button-container">
            <Button onClick={previousClick} disabled={index === 0}>Previous</Button>
            <Button onClick={nextClick} disabled={index === questions.length - 1}>Next</Button>
            <Button onClick={nextClick} disabled={index !== questions.length - 1}>Finish</Button>
            </div>
        </div>
    );
}

export default Question;
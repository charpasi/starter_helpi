import { Button } from "react-bootstrap";
import "./Question.css";
import React from 'react';

interface ButtonProps {
    onNext: () => void;
    onPrevious: () => void;
    onFinish: () => void;
    current: number;
    length: number;
}

export const QuestionButtons: React.FC<ButtonProps> = ({onNext, onPrevious, onFinish, current, length}) => {
    return (
        <div className="QuestionButtons"> 
            <div className="button-container">
            <Button onClick={onPrevious} disabled={current === 0}>Previous</Button>
            <Button onClick={onNext} disabled={current === length - 1}>Next</Button>
            <Button onClick={onFinish} disabled={current !== length - 1}>Finish</Button>
            </div>
        </div>
    );
}

export default QuestionButtons;

import {Form} from "react-bootstrap";
import React, {useEffect, useState } from 'react';
import "./MultipleChoiceInput.css";

interface MultipleChoiceInputProps {
    currentQuestion: number; 
}

export function MultipleChoiceInput({ currentQuestion }: MultipleChoiceInputProps): JSX.Element {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const answerOptions: string[] = [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree"
    ];

    useEffect(() => {
        // Reset selected option when the question changes
        setSelectedOption("");
    }, [currentQuestion]); // Dependency on currentQuestion
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };
    return (
        <div className="MultipleChoiceInput">
            <Form>
            {answerOptions.map((answer, index) => (
                <div className="radio-inline" key={index}>
                    <Form.Check
                        key={index}
                        name="responseGroup" 
                        type="radio"
                        label={answer}
                        value={answer}
                        checked={selectedOption === answer}
                        onChange={handleOptionChange} 
                    />
                </div>
                ))}
               
            </Form>
        </div>
    )
}
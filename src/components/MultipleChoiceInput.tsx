import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from 'react';
import "./MultipleChoiceInput.css";

export function MultipleChoiceInput(): JSX.Element {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const answerOptions: string[] = [
        "Strongly Agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly Disagree"
    ];
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
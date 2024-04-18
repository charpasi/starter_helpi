import { Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import "./TextInput.css";

interface TextInputProps {
    currentQuestion: number; 
}

export function TextInput({ currentQuestion }: TextInputProps): JSX.Element  {
    const [text, setText] = useState<string>(''); 

    // Reset text when the current question changes
    useEffect(() => {
        setText('');
    }, [currentQuestion]); 

    return (
        <div className="TextInput"> 
        <Form.Group controlId="formTextInput" as={Row} >
        <Form.Label column sm={2}></Form.Label>
        <Col>
        <Form.Control
        placeholder="Enter your response here."
        value={text}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setText(event.target.value)} 
        className = "text-input-box"/>
        </Col>
    </Form.Group>
        </div>
    );
}

export default TextInput;
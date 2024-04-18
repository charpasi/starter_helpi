import { Col, Form, Row } from "react-bootstrap";
import React from 'react';
import "./TextInput.css";

interface TextInputProps {
    text: string; 
    handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({ text, handleTextChange }: TextInputProps): JSX.Element {
    return (
        <div className="TextInput"> 
            <Form.Group controlId="formTextInput" as={Row}>
                <Form.Label column sm={2}></Form.Label>
                <Col>
                    <Form.Control
                        placeholder="Enter your response here."
                        value={text}
                        onChange={handleTextChange}
                        className="text-input-box"/>
                </Col>
            </Form.Group>
        </div>
    );
}

export default TextInput;
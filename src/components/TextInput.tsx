import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from 'react';
import "./TextInput.css";


export function TextInput(): JSX.Element  {
    const [text, setText] = useState<string>('Enter response here');
    return (
        <div className="TextInput"> 
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
        </div>
    );
}

export default TextInput;
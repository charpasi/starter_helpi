import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import "./Footer.css";

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if(prevKey !== null) {
    keyData = JSON.parse(prevKey);
}

function Footer() {
    const [key, setKey] = useState<string>(keyData);

    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload();
    }

    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
        setKey(event.target.value);
    }

    return (
        <footer className="Footer">
            <div>
                <p>Career Genie™ All Rights Reserved</p>
            </div>
            <div>
                <p><a>Contact us here</a></p>
            </div>
            <div>
                <Form>
                    <Form.Control type="password" placeholder="API Key" onChange={changeKey}/>
                    <Button className="submit-api-key" onClick={handleSubmit}>Submit</Button>
                </Form>
            </div>
        </footer>
    )
}

export default Footer;

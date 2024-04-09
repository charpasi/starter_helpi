import React, { useState } from 'react';
import logo from './logo.svg';
import { Button, Form } from 'react-bootstrap';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Page } from '../App';
import "./BasicQuestions.css"

function BasicQuestionsPage({
    setCurrentPage
}: {
    setCurrentPage: (pageName: Page) => void
}) {
    return (
        <div className="BasicPage">
            <div className="Title">
                <p>Basic Quiz</p>
            </div>
        </div>
    )
}
export default BasicQuestionsPage;
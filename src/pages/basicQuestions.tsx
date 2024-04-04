import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import Header from "../components/Header";
import Footer from "../components/Footer";


function basicQuestionsPage() {
    return (
        <div>
            <Header/>
            <p>Basic Questionnaire</p>
            <Footer/>
        </div>
    )
}
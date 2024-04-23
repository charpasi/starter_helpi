import React from 'react';
import { basicQuestions } from '../components/Question';
import { Page } from '../App';
import "./ReviewAnswersBasic.css";

interface ReviewAnswersPageBasicProps {
    answers: (string|null)[];
    setCurrentPage: (pageName: Page) => void;
    setReviewMode: (mode: boolean) => void;
}

const BasicQuestionsReviewPage: React.FC<ReviewAnswersPageBasicProps> = ({ answers, setCurrentPage, setReviewMode }) => {
    
    return (
        <div className="BasicQuestionsReviewPage">
            <h1>Review Your Answers Before Submitting</h1>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        <h3>Question {index + 1}: {basicQuestions[index]}</h3>
                        <p>Answer: {answer || "No response"}</p>
                       
                    </li>
                ))}
            </ul>
            <button onClick={() => setCurrentPage("main")}>Submit All Answers</button>
            <button onClick={() => setReviewMode(false)}>Change Response</button> 
        </div>
    );
}

export default BasicQuestionsReviewPage;
import React from 'react';
import { detailedQuestions } from '../components/Question';
import { Page } from '../App';
import "./ReviewAnswersDetailed.css";

interface ReviewAnswersPageDetailedProps {
    answers: string[];
    setCurrentPage: (pageName: Page) => void;
    setReviewMode: (mode: boolean) => void;
}

const ReviewAnswersDetailed: React.FC<ReviewAnswersPageDetailedProps> = ({ answers, setCurrentPage, setReviewMode }) => {
    
    return (
        <div className="DetailedQuestionsReviewPage">
            <h1>Review Your Answers Before Submitting</h1>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        <h3>Question {index + 1}: {detailedQuestions[index]}</h3>
                        <p>Answer: {answer}</p>
                    </li>
                ))}
            </ul>
            <button onClick={() => setCurrentPage("results")}>Submit All Answers</button>
            <button onClick={() => setReviewMode(false)}>Change Response</button> 
        </div>
    );
}

export default ReviewAnswersDetailed;
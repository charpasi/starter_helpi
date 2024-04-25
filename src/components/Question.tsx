import "./Question.css";
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

export const basicQuestions: string[] = [
    "I express my creativity whenever I work.",
    "I think more logically than emotionally when solving problems.",
    "I naturally act as a leader and enjoy leading others to a common goal.",
    "I work well with others.",
    "I excel with time management and prioritizing tasks.",
    "I want my future career to involve helping others and making a positive impact on the community.",
    "Collaborating with others brings out the best in my work.",
    "I enjoy brainstorming and coming up with innovative solutions.",
    "I consistently meet or exceed deadlines in my personal and professional endeavors.",
    "I often find myself thinking outside the box to solve problems.",
    "I am adaptable and can easily adjust to changing circumstances.",
    "I am motivated by achieving tangible results.",
    "I enjoy learning new skills and knowledge.",
    "I am comfortable speaking in front of groups or audiences.",
    "I am detail-oriented and strive for perfection in my work.",
    "I am passionate about continuous self-improvement and growth.",
    "I am comfortable challenging authority or traditional ways of thinking.",
    "I am driven by a sense of purpose in my work."
];

export const detailedQuestions: string[] = [
    "What are your top three technical strengths or skills?",
    "What are your top three soft skills?",
    "What motivates you in your career?",
    "What values do you prioritize in your professional life?",
    "What industries or sectors are you most passionate about?",
    "What subjects or topics do you excel at in school or work?",
    "What aspects of your current or past jobs do you find most fulfilling?",
    "Describe your preferred work environment.",
    "Are you more inclined towards creativity or structure in your work?",
    "How do you handle ambiguity and uncertainty?",
    "Do you prefer working independently or collaborating with others?",
    "How do you approach decision-making in your work?",
    "Describe your communication style in a work setting.",
    "What role do you typically take on in team projects?",
    "How do you handle setbacks or challenges in your work?",
    "How do you manage your time and prioritize tasks?",
    "What extracurricular activities or hobbies reflect your interests?",
    "What do you hope to achieve through your career?",
    "What extracurricular activities or hobbies do you enjoy in your free time?",
    "How do you handle pressure and tight deadlines?"
];

interface QuestionProps {
    questionArray: string[];
    current: number;
}

export const Question: React.FC<QuestionProps> = ({current, questionArray}) => {
    const [questions] = useState<string[]>(questionArray);
    return (
        <div className="Question"> 
            <ProgressBar current={current + 1} max={questions.length} />
            <h2>Question {current + 1}:</h2>
            <div className="question-container">
                <p>{ questions[current] }</p>
            </div>
        </div>
    );
}

export default Question;
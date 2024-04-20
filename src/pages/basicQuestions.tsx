import { useState } from 'react';
import { Page } from '../App';
import Question, { basicQuestions } from '../components/Question';
import { MultipleChoiceInput } from '../components/MultipleChoiceInput';
import QuestionButtons from '../components/QuestionButtons';
import "./BasicQuestions.css";

function BasicQuestionsPage({ setCurrentPage }: { setCurrentPage: (pageName: Page) => void }) {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<(string | null)[]>(new Array(basicQuestions.length).fill(null));

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = e.target.value;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        setCurrentQuestion(prev => prev + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestion(prev => prev - 1);
    };

    const handleFinish = () => {
        console.log('Collected Answers:', answers); // placeholder for now :3 
        setCurrentPage("main"); // change to results page later
    };

    return (
        <div className="BasicPage">
            <div className="Header">
                <div className="Title">
                    <p>Basic Quiz</p>
                </div>
                <div className="Description">
                    <p>A short, basic, multiple choice quiz catered towards those who already have an idea of what they want to do.</p>
                </div>
            </div>
            <div className="QuestionBox">
                <Question current={currentQuestion} questionArray={basicQuestions}/>
                <div className="Options">
                    <MultipleChoiceInput
                        selectedOption={answers[currentQuestion]}
                        handleOptionChange={handleOptionChange}
                    />
                </div>
                <QuestionButtons
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onFinish={handleFinish}
                    current={currentQuestion}
                    length={basicQuestions.length}
                />
            </div>
        </div>
    );
}

export default BasicQuestionsPage;
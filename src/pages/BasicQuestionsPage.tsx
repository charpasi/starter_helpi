/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import { Page } from '../App';
import Question, { basicQuestions } from '../components/Question';
import { MultipleChoiceInput } from '../components/MultipleChoiceInput';
import QuestionButtons from '../components/QuestionButtons';
import BasicQuestionsReviewPage from '../components/ReviewAnswersBasic'; 
import "./BasicQuestionsPage.css";

function BasicQuestionsPage({
    setCurrentPage,
    answers,
    setAnswers
}: {
    setCurrentPage: (pageName: Page) => void
    answers: string[]
    setAnswers: (answers: string[]) => void
}) {
    // index of current question
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    // when review mode is true, answers page is replaced with the ReviewAnswers page
    const [reviewMode, setReviewMode] = useState<boolean>(false);

    const [running, setRunning] = useState<boolean>(false);

    useEffect(() => {
        if(running) return;
        setRunning(true);
        console.log("Running");
    }, [running]); // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    
    // updates the answers array
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = e.target.value;
        setAnswers(newAnswers);
    };

    //goes to next question
    const handleNext = () => {
        setCurrentQuestion(prev => prev + 1);
    };

    //goes to previous question
    const handlePrevious = () => {
        setCurrentQuestion(prev => prev - 1);
    };

    //goes to review mode when finished
    const handleFinish = () => {
        console.log('Collected Answers:', answers); 
        setReviewMode(true); // review mode goes on once we finish
    };

    return (
        <div className="BasicPage">
            <div className="Header">
                <div className="Title">
                    <p>Basic Quiz</p>
                </div>
            </div>
            <div className="QuestionBox">
                {reviewMode ? ( // conditionally render the review page
                    <BasicQuestionsReviewPage answers={answers} setCurrentPage={setCurrentPage} setReviewMode={setReviewMode} />
                ) : (
                    // if review mode is false, then just dsplay the questions like normal.
                    <>
                        <Question current={currentQuestion} questionArray={basicQuestions} />
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
                    </>
                )}
            </div>
        </div>
    );
}

export default BasicQuestionsPage;
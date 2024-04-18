import { Page } from '../App';
import "./BasicQuestions.css"
import Question, { basicQuestions } from '../components/Question';
import { MultipleChoiceInput } from '../components/MultipleChoiceInput';
import QuestionButtons from '../components/QuestionButtons';
import { useState } from 'react';

function BasicQuestionsPage({
    setCurrentPage
}: {
    setCurrentPage: (pageName: Page) => void
}) {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const handleNext = () => {
        setCurrentQuestion(prevIndex => prevIndex + 1);
    };
    const handlePrevious = () => {
        setCurrentQuestion(prevIndex => prevIndex - 1);
      };
    const handleFinish = () => {
        setCurrentPage("main");
    };
    return (
        <div className="BasicPage">
            <div className="Header">
                <div className="Title">
                    <p>
                        Basic Quiz
                    </p>
                </div>
                <div className="Description">
                    <p>
                      A short, basic, multiple choice quiz catered towards those who already have an idea of what they want to do.
                    </p>
                </div>
            </div>
            <div className="QuestionBox">
            <Question current = {currentQuestion} questionArray = {basicQuestions}/>
            <div className="Options">
                <MultipleChoiceInput currentQuestion={currentQuestion}/>
            </div>
            <QuestionButtons onNext = {handleNext} onPrevious = {handlePrevious} onFinish={handleFinish} current={currentQuestion} length = {basicQuestions.length} />
            </div>
        </div>
        
    )
}
export default BasicQuestionsPage;
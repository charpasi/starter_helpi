import { useState } from "react";
import { Page } from "../App";
import Question, { detailedQuestions } from "../components/Question";
import TextInput from "../components/TextInput";
import QuestionButtons from "../components/QuestionButtons";
import ReviewAnswersDetailed from "../components/ReviewAnswersDetailed"

function DetailedQuestions({ setCurrentPage }: { setCurrentPage: (pageName: Page) => void }) {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<string[]>(new Array(detailedQuestions.length).fill(''));
    const [reviewMode, setReviewMode] = useState<boolean>(false);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = event.target.value;
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        setCurrentQuestion(prevIndex => prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestion(prevIndex => prevIndex - 1);
    };

    const handleFinish = () => {
        console.log('Collected Answers:', answers);
        setReviewMode(true); 
    };
    

    return (
        <div className="DetailedPage">
            <h1>Detailed Questions</h1>
            {reviewMode ? ( // conditionally rendering the review page again like in basic
                <ReviewAnswersDetailed
                    answers={answers}
                    setCurrentPage={setCurrentPage}
                    setReviewMode={setReviewMode}
                />
            ) : (
                <>
                    <Question current={currentQuestion} questionArray={detailedQuestions}/>
                    <TextInput
                        text={answers[currentQuestion]}
                        handleTextChange={handleTextChange}
                    />
                    <QuestionButtons
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onFinish={handleFinish}
                        current={currentQuestion}
                        length={detailedQuestions.length}
                    />
                </>
            )}
        </div>
    );
}


export default DetailedQuestions;
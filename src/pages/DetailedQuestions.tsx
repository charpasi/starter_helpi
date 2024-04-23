import { useState } from "react";
import { Page } from "../App";
import Question, { detailedQuestions } from "../components/Question";
import TextInput from "../components/TextInput";
import QuestionButtons from "../components/QuestionButtons";

function DetailedQuestions({
    setCurrentPage,
    answers,
    setAnswers
}: {
    setCurrentPage: (pageName: Page) => void
    answers: string[]
    setAnswers: (answers: string[]) => void
}) {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

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
        console.log('Collected Answers:', answers); // placeholder for now :3
        setCurrentPage("main"); // change to results page later
    };

    return (
        <div className="DetailedPage">
            <h1>Detailed Questions</h1>
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
        </div>
    );
}

export default DetailedQuestions;
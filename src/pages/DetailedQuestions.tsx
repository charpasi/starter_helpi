import { useState } from "react";
import { Page } from "../App";
import { detailedQuestions } from "../components/Question"
import Question from "../components/Question";
import TextInput from "../components/TextInput";
import QuestionButtons from "../components/QuestionButtons";


function DetailedQuestions( {
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
    return (
        <div className="DetailedPage">
             <h1>Detailed Questions </h1>
             <Question current = {currentQuestion} questionArray = { detailedQuestions}/>
             <TextInput/>
             <QuestionButtons onNext = {handleNext} onPrevious = {handlePrevious} current={currentQuestion} length = {detailedQuestions.length} />
        </div>
    );
}

export default DetailedQuestions;
import { useCallback, useState } from "react";
import { Page } from "../App";
import Question, { detailedQuestions } from "../components/Question";
import TextInput from "../components/TextInput";
import QuestionButtons from "../components/QuestionButtons";
import ReviewAnswersDetailed from "../components/ReviewAnswersDetailed"
import Genie from "../components/Genie";

import { saveKeyData } from "../App";
import "./DetailedQuestions.css"
import { ResponseObject } from "./ResultsPage";

const genieResponseSystem = `You are tasked with helping a user find the best career for them based on a questionnaire. You will be provided with a single question and the user's answer in the following format:

[Question 1 text]. [Response]

Your response is intended to acknowledge to the user that their response has been recorded. You should respond with a short sentence describing what traits from the user's response are desirable to what employers.`;

function DetailedQuestionsPage({
    setCurrentPage,
    answers,
    setAnswers
}: {
    setCurrentPage: (pageName: Page) => void
    answers: string[]
    setAnswers: (answers: string[]) => void
}) {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [furthestQuestion, setFurthestQuestion] = useState<number>(0);
    const [reviewMode, setReviewMode] = useState<boolean>(false);

    const [genieText, setGenieText] = useState<string>("");
    const [genieShowing, setGenieShowing] = useState<boolean>(false);

    const getGenieResponse = useCallback(async () => {
        console.log("Starting genie response algorithm...");

        const answer = answers[currentQuestion];
        if(!answer) {
            console.error("No answer detected");
            return;
        }

        const postData = JSON.stringify({
            "model": "gpt-4-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": genieResponseSystem
                },
                {
                    "role": "user",
                    "content": `${detailedQuestions[currentQuestion]} ${answer}`
                }
            ],
            "max_tokens": 255
        });

        console.log("Contacting Genie...");

        setGenieShowing(true);

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem(saveKeyData) || "")}`
            },
            body: postData
        });

        if(!response.ok) {
            console.error("Open AI API did not return a valid response");
            return;
        }

        const json: ResponseObject = await response.json();
        const textResponse = json?.choices?.[0]?.message?.content;

        if(!textResponse) {
            console.error("Open AI API did not return a valid response object");
            return;
        }

        console.log(textResponse);

        setGenieText(textResponse);
    }, [answers, currentQuestion]);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = event.target.value;
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if(genieShowing || furthestQuestion !== currentQuestion) {
            setGenieShowing(false);
            setCurrentQuestion(prevIndex => prevIndex + 1);
        } else if(answers[currentQuestion]) {
            setGenieText("");
            getGenieResponse();
            setFurthestQuestion(furthestQuestion + 1);
        }
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
                    <div className = "QuestionBox">
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
                </>
            )}
            <Genie
                text={genieText}
                show={genieShowing}
            />
        </div>
    );
}

export default DetailedQuestionsPage;

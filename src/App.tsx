import { useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResultsPage from "./pages/ResultsPage";
import DetailedQuestionsPage from "./pages/DetailedQuestionsPage";
import BasicQuestionsPage from "./pages/BasicQuestionsPage";
import { basicQuestions, detailedQuestions } from "./components/Question";

let keyData = "";
export const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if(prevKey !== null) {
    keyData = JSON.parse(prevKey);
}

export type Page = "main" | "basic" | "detailed" | "results";

function App() {
    const [key, setKey] = useState<string>(keyData); // API key
    const [currentPage, setCurrentPage] = useState<Page>("main"); // basic page router using a stateful string

    // initalize answers to empty
    const [basicAnswers, setBasicAnswers] = useState<string[]>(new Array(basicQuestions.length).fill(""));
    const [detailedAnswers, setDetailedAnswers] = useState<string[]>(new Array(detailedQuestions.length).fill(""));
    // keep track of which quiz we're going through for use in the results page
    const [currentQuiz, setCurrentQuiz] = useState<"basic" | "detailed">("basic");

    // submits a new API key
    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload();
    }
    
    return (
        <div className="App">
            <Header
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div className="page-renderer">
                { // this is our router, uses a switch statement with a stateful string keeping track of the current page
                    {
                        "main": <HomePage
                            setCurrentPage={setCurrentPage}
                            setCurrentQuiz={setCurrentQuiz}
                        />,
                        "basic": <BasicQuestionsPage
                            setCurrentPage={setCurrentPage}
                            answers={basicAnswers}
                            setAnswers={setBasicAnswers}
                        />,
                        "detailed": <DetailedQuestionsPage
                            setCurrentPage={setCurrentPage}
                            answers={detailedAnswers}
                            setAnswers={setDetailedAnswers}
                        />,
                        "results": <ResultsPage
                            setCurrentPage={setCurrentPage}
                            currentQuiz={currentQuiz}
                            basicAnswers={basicAnswers}
                            detailedAnswers={detailedAnswers}
                        />
                    }[currentPage]
                }
            </div>
            <Footer
                setKey={setKey}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default App;

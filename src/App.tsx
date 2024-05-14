import { useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResultsPage from "./pages/ResultsPage";
import DetailedQuestionsPage from "./pages/DetailedQuestionsPage";
import BasicQuestionsPage from "./pages/BasicQuestionsPage";
import { basicQuestions, detailedQuestions } from "./components/Question";
import backgroundImage from "./assets/genie-background.png"; 


let keyData = "";
export const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if(prevKey !== null) {
    keyData = JSON.parse(prevKey);
}

export type Page = "main" | "basic" | "detailed" | "results";

function App() {
    const [key, setKey] = useState<string>(keyData);
    const [currentPage, setCurrentPage] = useState<Page>("main");

    const [basicAnswers, setBasicAnswers] = useState<string[]>(new Array(basicQuestions.length).fill(""));
    const [detailedAnswers, setDetailedAnswers] = useState<string[]>(new Array(detailedQuestions.length).fill(""));
    const [currentQuiz, setCurrentQuiz] = useState<"basic" | "detailed">("basic");

    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload();
    }
    
    return (
        <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Header
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div className="page-renderer">
                {
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

import { useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Results from "./pages/ResultsPage";
import DetailedQuestions from "./pages/DetailedQuestions";
import BasicQuestionsPage from "./pages/BasicQuestions";
import StartupAnimation from "./components/StartupAnimation";

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
    const [animationFinished, setAnimationFinished] = useState<boolean>(true);

    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload();
    }

    if (!animationFinished) {
        return <StartupAnimation onAnimationComplete={() => setAnimationFinished(true)} />;
    }
    
    return (
        <div className="App">
            <Header
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div className="page-renderer">
                {
                    {
                        "main": <HomePage
                            setCurrentPage={setCurrentPage}
                        />,
                        "basic": <BasicQuestionsPage
                            setCurrentPage={setCurrentPage}
                        />,
                        "detailed": <DetailedQuestions
                            setCurrentPage={setCurrentPage}
                        />,
                        "results": <Results
                            setCurrentPage={setCurrentPage}
                        />
                    }[currentPage]
                }
            </div>
            {/*
            <div>
                <button onClick={() => setCurrentPage("main")}>Main page</button>
                <button onClick={() => setCurrentPage("basic")}>Basic</button>
                <button onClick={() => setCurrentPage("detailed")}>Detailed</button>
                <button onClick={() => setCurrentPage("results")}>Results</button>
            </div>
            */}
            <Footer
                setKey={setKey}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default App;

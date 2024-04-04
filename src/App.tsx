import React, { useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if(prevKey !== null) {
    keyData = JSON.parse(prevKey);
}

type Page = "main";

function App() {
    const [key, setKey] = useState<string>(keyData);
    const [currentPage, setCurrentPage] = useState<Page>("main");

    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload();
    }

    return (
        <div className="App">
            <Header/>
            {
                {
                    "main": <HomePage/>
                }[currentPage]
            }
            <Footer
                setKey={setKey}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default App;

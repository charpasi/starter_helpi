import { useCallback } from "react";

import "./Header.css";

import { Page } from "../App";
import logo from "../assets/logo.jpg";
import genie from "../assets/pikmin.png";


function Header({
    currentPage,
    setCurrentPage
}: {
    currentPage: Page;
    setCurrentPage: (pageName: Page) => void;
}) {
    const navigateHome = useCallback(() => {
        if(currentPage === "main") return;
        if(window.confirm("Are you sure you want to return to the home page?")) {
            setCurrentPage("main");
        }
    }, [currentPage, setCurrentPage]);

    return (
        <header onClick={() => navigateHome()} className={`Header ${currentPage === "main" ? "" : "pointer"}`}>
            <h1>Career Genie</h1>
            <img src={genie} alt="genie" className="genie-image"/>
            <nav className="NavBar">
                <ul>
                    <li onClick={() => setCurrentPage("main")}>Main Page</li>
                    <li onClick={() => setCurrentPage("debug")}>Debug Page</li>
                    <li onClick={() => setCurrentPage("basic")}>Basic Quiz</li>
                    <li onClick={() => setCurrentPage("detailed")}>Detailed Quiz</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

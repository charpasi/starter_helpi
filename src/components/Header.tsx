import { useCallback } from "react";

import "./Header.css";

import { Page } from "../App";
import genie from "../assets/pikmin.png";


function Header({
    currentPage,
    setCurrentPage
}: {
    currentPage: Page;
    setCurrentPage: (pageName: Page) => void;
}) {
    const navigateToPage = useCallback((pageName: Page) => {
        if(currentPage === pageName) return;
        if(currentPage === "main") {
            setCurrentPage(pageName);
            return;
        }
        if(window.confirm("Are you sure you want to navigate from the current page?")) {
            setCurrentPage(pageName);
        }
    }, [currentPage, setCurrentPage]);

    return (
        <header className="Header">
            <h1
                onClick={() => navigateToPage("main")} className={currentPage === "main" ? "" : "pointer"}
            >
                Career Genie
            </h1>
            <img src={genie} alt="genie" className="genie-image"/>
            <nav className="NavBar">
                <ul>
                    <li onClick={() => navigateToPage("main")}>Main Page</li>
                    <li onClick={() => navigateToPage("basic")}>Basic Quiz</li>
                    <li onClick={() => navigateToPage("detailed")}>Detailed Quiz</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

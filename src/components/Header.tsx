import { useCallback } from "react";

import "./Header.css";

import { Page } from "../App";
import logo from "../assets/logo.jpg";

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
            <img src={logo} alt="logo"/>
            <h1>Career Genie</h1>
        </header>
    );
}

export default Header;

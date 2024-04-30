import React from 'react';
import "./NavBar.css";
import { Page } from "../App";

export function NavBar({
    setCurrentPage
}: {
    setCurrentPage: (pageName: Page) => void
}) {
    return (
        <nav className="NavBar">
                <ul>
                    <li onClick={() => setCurrentPage("main")}>Main Page</li>
                    <li onClick={() => setCurrentPage("basic")}>Basic Quiz</li>
                    <li onClick={() => setCurrentPage("detailed")}>Detailed Quiz</li>
                </ul>
            </nav>
    )
};

export default NavBar;
import "./Header.css";

import logo from "../assets/logo.jpg";

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="logo"/>
            <h1>Career Genie</h1>
        </header>
    );
}

export default Header;

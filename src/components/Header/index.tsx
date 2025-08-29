import React from "react";
import "./css/style.css";

interface HeaderProps {
    appName: string;
}

const Header = ({ appName }: HeaderProps) => {
    return (
        <header>
            <div className="logo">{appName}</div>
            <nav className="nav-links">
                <a href="/">Inicio</a>
            </nav>
        </header>
    )
}

export default Header;
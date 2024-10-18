import { useState } from "react";
import Board from "../../GameArea/Board/Board";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";

function Layout(): JSX.Element {
    const [winner, setWinner] = useState<string>(null);

    return (
        <div className="Layout">
            <header><Header /></header>
            <main><Board /></main>
            <footer><Footer /></footer>
        </div>
    );
}

export default Layout;

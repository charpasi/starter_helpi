import "./Genie.css";
import genie from "../assets/pikmin.png";
import { useEffect, useState } from "react";

const interval = 100;

function Genie({
    text,
    show
}: {
    text: string
    show: boolean
}) {
    const [displayText, setDisplayText] = useState<string>("");

    useEffect(() => {
        let currentIndex = 0;
        const words = text.split(" ");
        const intervalFunction = setInterval(() => {
            if(currentIndex < words.length) {
                setDisplayText(prevText => prevText + (words[currentIndex] ? words[currentIndex] : "") + " ");
                currentIndex++;
            } else {
                clearInterval(intervalFunction);
            }
        }, interval);

        return () => clearInterval(intervalFunction)
    }, [text]);

    useEffect(() => {
        setDisplayText(text.split(" ")[0] + " ");
    }, [text]);

    return (
        <div className={`Genie ${show ? "showing" : "not-showing"}`}>
            <img src={genie} alt="genie"/>
            {
                text ? <p>{displayText}</p> : ""
            }
        </div>
    )
}

export default Genie;

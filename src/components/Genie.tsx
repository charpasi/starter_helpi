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

    useEffect(() => { // triggers when the text changes
        let currentIndex = 0;
        const words = text.split(" ");
        const intervalFunction = setInterval(() => { // every 100ms, append a new word to the displayed text
            if(currentIndex < words.length) { // while there are still words to append,
                // append it!
                setDisplayText(prevText => prevText + (words[currentIndex] ? words[currentIndex] : "") + " ");
                currentIndex++;
            } else {
                clearInterval(intervalFunction); // no words left to append, so stop the appending function
            }
        }, interval);

        return () => clearInterval(intervalFunction)
    }, [text]);

    // using just the above function doesn't display the first word, so we add a bodge here to fix that
    useEffect(() => {
        setDisplayText(text.split(" ")[0] + " "); // first text displayed is the first word
    }, [text]);

    return (
        <div className={`Genie ${show ? "showing" : "not-showing"}`}>
            <img src={genie} alt="genie"/>
            {
                text ? <p>{displayText}</p> : "" // don't display the bubble if there's no text displayed
            }
        </div>
    )
}

export default Genie;

import "./Genie.css";
import genie from "../assets/pikmin.png";

function Genie({
    text,
    show
}: {
    text: string
    show: boolean
}) {
    return (
        <div className={`Genie ${show ? "showing" : "not-showing"}`}>
            <img src={genie} alt="genie"/>
            {
                text ? <p>{text}</p> : ""
            }
        </div>
    )
}

export default Genie;

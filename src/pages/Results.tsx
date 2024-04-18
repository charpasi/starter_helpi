import { getBasicQuestionsResponse } from "../services/ai";

function clickMe() {
    getBasicQuestionsResponse([]);
}

function Results() {
    return (
        <div className="Results">
            <p>Results :3</p>
            <button onClick={() => clickMe()}>Send API request</button>
        </div>
    )
}

export default Results;

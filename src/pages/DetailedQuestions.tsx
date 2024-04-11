import { Page } from "../App";
import Question from "../components/Question";

function DetailedQuestions( {
    setCurrentPage
}: {
    setCurrentPage: (pageName: Page) => void
}) {return (
        <div className="DetailedPage">
             <h1>Detailed Questions </h1>
             <Question/>
        </div>
    );
}

export default DetailedQuestions;
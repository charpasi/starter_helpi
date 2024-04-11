import { Page } from "../App";
import Question from "../components/Question";
import { detailedQuestions } from "../components/Question"

function DetailedQuestions( {
    setCurrentPage
}: {
    setCurrentPage: (pageName: Page) => void
}) {return (
        <div className="DetailedPage">
             <h1>Detailed Questions </h1>
             <Question questionArray = {detailedQuestions}/>
        </div>
    );
}

export default DetailedQuestions;
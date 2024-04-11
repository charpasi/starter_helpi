import { Page } from '../App';
import "./BasicQuestions.css"
import Question, { basicQuestions } from '../components/Question';
import { MultipleChoiceInput } from '../components/MultipleChoiceInput';

function BasicQuestionsPage({
    setCurrentPage
}: {
    setCurrentPage: (pageName: Page) => void
}) {
    return (
        <div className="BasicPage">
            <div className="Header">
                <div className="Title">
                    <p>
                        Basic Quiz
                    </p>
                </div>
                <div className="Description">
                    <p>
                      A short, basic, multiple choice quiz catered towards those who already have an idea of what they want to do.
                    </p>
                </div>
            </div>
            <div className="QuestionBox">
            <Question questionArray = {basicQuestions}/>
            </div>
            <div className="Options">
                <MultipleChoiceInput/>
            </div>
        </div>
        
    )
}
export default BasicQuestionsPage;
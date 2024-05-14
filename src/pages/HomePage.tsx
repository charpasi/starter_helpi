import "./HomePage.css";
import { Page } from "../App";

function HomePage({
    setCurrentPage,
    setCurrentQuiz
}: {
    setCurrentPage: (pageName: Page) => void
    setCurrentQuiz: (quiz: "basic" | "detailed") => void
}) {
    function navigateToBasicQuestions() {
        setCurrentQuiz("basic");
        setCurrentPage("basic");
    }

    function navigateToDetailedQuestions() {
        setCurrentQuiz("detailed");
        setCurrentPage("detailed");
    }

    return (
        <div className="HomePage">
            <div className = "intro">
                <div>
                    <h1>Do YOU Know what field you'll go into?</h1>
                    <p>
                        A quarter of high school graduates still have no idea what career they'd like to have post-graduation. But don't worry: you're in good hands.
                        Meet the Career Genie: a helpful purple spirit tasked with figuring out what makes you tick. With Career Genie, discovering your ideal career
                        path isn't just a quiz—it's an adventure tailored uniquely to you. Our intuitive platform leverages the latest in AI technology to provide you
                        the insights that illuminate your true calling. Take one of our personalized quizzes to narrow down your interests, and maybe find the future
                        career that's right for you!
                    </p>
                </div>
            </div>
            <div className="quiz-wrapper" onClick={() => navigateToBasicQuestions()}>
                <div className="quiz-card">
                    <div>
                        <h2>Basic Quiz</h2>
                        <h3>Estimated: 5 minutes</h3>
                    </div>
                    <p>
                        A short, basic, multiple choice quiz catered towards those who already have an idea of what they want to do.
                    </p>
                </div>
                <div className="quiz-card" onClick={() => navigateToDetailedQuestions()}>
                    <div>
                        <h2>Detailed Quiz</h2>
                        <h3>Estimated: 15 minutes</h3>
                    </div>
                    <p>
                        Long, detailed, open ended quiz catered towards those who want a thorough list of possible career options.
                    </p>
                </div>
            </div>
            <button onClick={() => setCurrentPage("results")}>Go to results page</button>
        </div>
    );
}

export default HomePage;

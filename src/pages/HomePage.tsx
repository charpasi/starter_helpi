import "./HomePage.css";

import genie from "../assets/pikmin.png";

function HomePage() {
    return (
        <div className="HomePage">
            <div>
                <div>
                    <img src={genie} alt="genie" className="genie-image"/>
                </div>
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
            <div>
                <h1>Take your personalized quiz now!</h1>
            </div>
            <div className="quiz-wrapper">
                <div className="quiz-card">
                    <div>
                        <h2>Short questionnaire (5 min)</h2>
                        <button>Click me!</button>
                    </div>
                    <p>
                        Lengthy description of the short quesitonnaire
                    </p>
                </div>
                <div className="quiz-card">
                    <div>
                        <h2>Long questionnaire (15 min)</h2>
                        <button>Click me!</button>
                    </div>
                    <p>
                        Lengthy description of the long questionnaire
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

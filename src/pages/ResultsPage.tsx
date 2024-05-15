import { useState, useEffect, useRef } from "react";
import "./ResultsPage.css";

import LoadingAnimation from "../components/LoadingAnimation";
import { Career, CareerDisplay } from "../components/CareerDisplay";
import { saveKeyData, Page } from "../App";
import { basicQuestions, detailedQuestions } from "../components/Question";
import ResultsPieChart from "../components/ResultsPieChart";
import ExportButton from "../components/ExportButton";

const useApi = false; 

// object returned by the Open AI API
export type ResponseObject = {
    id: string,
    object: string,
    created: number,
    model: string,
    system_fingerprint: string,
    choices: {
        index: number,
        message: {
            role: string,
            content: string
        },
        logprobs: any,
        finish_reason: string
    }[],
    usage: {
        prompt_tokens: number,
        completion_tokens: number,
        total_tokens: number
    }
};

const basicUserScoreSystem = `You are tasked with providing a personality score for a user based on a questionnaire. You will be provided input as follows:

[Question 1 text]. [Response]&&&
[Question 2 text]. [Response]&&&
...

Response can be "Strongly Disagree", "Disagree", "Neither", "Agree", or "Strongly Agree". Each question and response pair will be separated by "&&&" as shown above.

The six personality scores are as follows:

    Realistic: 
        -Likes to work with animals, tools, or machines; generally avoids social activities like teaching, healing, and informing others;
        -Has good skills in working with tools, mechanical or electrical drawings, machines, or plants and animals;
        -Values practical things you can see, touch, and use like plants and animals, tools, equipment, or machines; and
        -Sees self as practical, mechanical, and realistic.

    Investigative:
        -Likes to study and solve math or science problems; generally avoids leading, selling, or persuading people;
        -Is good at understanding and solving science and math problems;
        -Values science; and
        -Sees self as precise, scientific, and intellectual.

    Artistic:
        -Likes to do creative activities like art, drama, crafts, dance, music, or creative writing; generally avoids highly ordered or repetitive activities;
        -Has good artistic abilities -- in creative writing, drama, crafts, music, or art;
        -Values the creative arts -- like drama, music, art, or the works of creative writers; and
        -Sees self as expressive, original, and independent.

    Social:
        -Likes to do things to help people -- like, teaching, nursing, or giving first aid, providing information; generally avoids using machines, tools, or animals to achieve a goal;
        -Is good at teaching, counseling, nursing, or giving information;
        -Values helping people and solving social problems; and
        -Sees self as helpful, friendly, and trustworthy.

    Enterprising:
        -Likes to lead and persuade people, and to sell things and ideas; generally avoids activities that require careful observation and scientific, analytical thinking;
        -Is good at leading people and selling things or ideas;
        -Values success in politics, leadership, or business; and
        -Sees self as energetic, ambitious, and sociable.

    Conventional:
        -Likes to work with numbers, records, or machines in a set, orderly way; generally avoids ambiguous, unstructured activities
        -Is good at working with written records and numbers in a systematic, orderly way;
        -Values success in business; and
        -Sees self as orderly, and good at following a set plan.
    
Please format your response in the following format. Please make sure all the percentages add up to exactly 100.:
    Realistic: x%
    Investigative: x%
    Artistic: x%
    Social: x%
    Enterprising: x%
    Conventional: x%

Please do not write anything else in your response other than the information in the above format. Please respond with each personality and percentage on a new line.
`;

const detailedUserScoreSystem = `You are tasked with providing a personality score for a user based on a questionnaire. You will be provided input as follows:
Each question and response pair will be separated by "&&&" as shown above.

[Question 1 text]. [Response]&&&
[Question 2 text]. [Response]&&&
...

The six personality scores are as follows:

    Realistic: 
        -Likes to work with animals, tools, or machines; generally avoids social activities like teaching, healing, and informing others;
        -Has good skills in working with tools, mechanical or electrical drawings, machines, or plants and animals;
        -Values practical things you can see, touch, and use like plants and animals, tools, equipment, or machines; and
        -Sees self as practical, mechanical, and realistic.

    Investigative:
        -Likes to study and solve math or science problems; generally avoids leading, selling, or persuading people;
        -Is good at understanding and solving science and math problems;
        -Values science; and
        -Sees self as precise, scientific, and intellectual.

    Artistic:
        -Likes to do creative activities like art, drama, crafts, dance, music, or creative writing; generally avoids highly ordered or repetitive activities;
        -Has good artistic abilities -- in creative writing, drama, crafts, music, or art;
        -Values the creative arts -- like drama, music, art, or the works of creative writers; and
        -Sees self as expressive, original, and independent.

    Social:
        -Likes to do things to help people -- like, teaching, nursing, or giving first aid, providing information; generally avoids using machines, tools, or animals to achieve a goal;
        -Is good at teaching, counseling, nursing, or giving information;
        -Values helping people and solving social problems; and
        -Sees self as helpful, friendly, and trustworthy.

    Enterprising:
        -Likes to lead and persuade people, and to sell things and ideas; generally avoids activities that require careful observation and scientific, analytical thinking;
        -Is good at leading people and selling things or ideas;
        -Values success in politics, leadership, or business; and
        -Sees self as energetic, ambitious, and sociable.

    Conventional:
        -Likes to work with numbers, records, or machines in a set, orderly way; generally avoids ambiguous, unstructured activities
        -Is good at working with written records and numbers in a systematic, orderly way;
        -Values success in business; and
        -Sees self as orderly, and good at following a set plan.
    
Please format your response in the following format. Please make sure all the percentages add up to exactly 100.:
    Realistic: x%
    Investigative: x%
    Artistic: x%
    Social: x%
    Enterprising: x%
    Conventional: x%

Please do not write anything else in your response other than the information in the above format. Please respond with each personality and percentage on a new line.
`;

const basicQuestionsSystem = `You are tasked with helping a user find the best career for them based on a questionnaire. You will be provided input as follows:

[Question 1 text]. [Response]&&&
[Question 2 text]. [Response]&&&
...

Response can be "Strongly Disagree", "Disagree", "Neither", "Agree", or "Strongly Agree". Each question and response pair will be separated by "&&&" as shown above.

Please format your responses in this format:
[Career name] - $[Starting salary]###[Short description of career]###[Short explanation as to why this career would be good]###

Please do not write anything else in your response other than information in the above format. Please respond with four different careers on different lines.`;

const detailedQuestionsSystem = `You are tasked with helping a user find the best career for them based on a questionnaire. You will be provided input as follows:

[Question 1 text]? [Response]&&&
[Question 2 text]? [Response]&&&
...

Each question and response pair will be separated by "&&&" as shown above.

Please format your responses in this format:
[Career name] - $[starting salary]###[Short description of career]###[Short explanation as to why this career would be good]###

Please do not write anything else in your response other than information in the above format. Please respond with four different careers on different lines.`;

const exampleResponseText = `Art Therapist - $40,000###Art therapists use the creative process of art-making to improve and enhance the physical, mental, and emotional well-being of individuals. This career would be good for you as it allows you to express your creativity, help others, and make a positive impact through your work.###

Project Manager - $60,000###Project managers are responsible for planning, overseeing, and leading projects from initiation through completion. Your natural leadership ability, strong teamwork skills, and proficiency in time management make this a suitable career choice for you.###

Social Worker - $45,000###Social workers help individuals, families, and communities deal with their personal and social problems. Your desire to help others, work well with people, and make a positive impact align well with this career.###

Urban Planner - $50,000###Urban planners develop plans and programs for the use of land. Your logical problem-solving skills, ability to work well with others, and desire to create a positive impact on the community make this career a good fit for you.###`;

function ResultsPage({
    setCurrentPage,
    currentQuiz,
    basicAnswers,
    detailedAnswers
}: {
    setCurrentPage: (pageName: Page) => void
    currentQuiz: "basic" | "detailed",
    basicAnswers: string[],
    detailedAnswers: string[]
}) {
    const [careers, setCareers] = useState<Career[]>([]); // list of careers to display
    // toggles whether or not we're currently loading
    const [loading, setLoading] = useState<boolean | null>(null); // null = newly loaded page, false = not loading, true = loading
    const contentRef = useRef(null);  
    const [scores, setScores] = useState<number[]>([]);

    useEffect(() => {
        if(loading !== null) return;  // prevents occasional double contacts

        console.log("Contacting genie...");

        setLoading(true);
        // different function calls depending on the quiz type
        const apiResponse = currentQuiz === "basic" ?
            getQuestionsResponse(basicAnswers, "basic") :
            getQuestionsResponse(detailedAnswers, "detailed");

        const userScoreResponse = currentQuiz === "basic" ?
            getUserScore(basicAnswers, "basic") :
            getUserScore(detailedAnswers, "detailed") ;

        console.log(userScoreResponse);

        apiResponse.then(careerList => {
            if(careerList === null) { // couldn't get the results page
                // basic error handling
                console.error("Cannot update results page");
                alert("Fatal error while contacting the genie. Try rubbing the lamp again in a few minutes.");
                return;
            }
            // display the careers
            setCareers(careerList);
            // done loading, display the career list
            setLoading(false);
        });
    }, [basicAnswers, detailedAnswers, currentQuiz, loading]);

    if(loading) {
        return <LoadingAnimation/>;  // if we're loading, don't display anything but the loading screen
    }

    async function getQuestionsResponse(answers: string[], type: "basic" | "detailed"): Promise<Career[] | null> {
        if(answers.length !== basicQuestions.length) { // simple error checking
            console.error("Responses array and questions array are of different lengths");
            return null;
        }       
        // map the answers into a long string defined in the career fetching system
        const answersText = type === "basic" ?
            answers.map((r, i) => `${basicQuestions[i]} ${r}&&&`).join("\n").trim() :
            answers.map((r, i) => `${detailedQuestions[i]} ${r}&&&`).join("\n").trim();
    
        const postData = JSON.stringify({
            "model": "gpt-4-turbo", // gpt-4-turbo-preview is slower
            "messages": [
                {
                    "role": "system",
                    "content": type === "basic" ? basicQuestionsSystem : detailedQuestionsSystem
                },
                {
                    "role": "user",
                    "content": answersText
                }
            ],
            "max_tokens": 400
        });
        // call API with the above options or return a dummy response if we're in debug mode
        const response = useApi ? await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem(saveKeyData) || "")}`
            },
            body: postData
        }) : {
            ok: true,
            json: async () => new Promise((res, _) => {
                setTimeout(() => {
                    res({
                        choices: [
                            {
                                message: {
                                    content: exampleResponseText
                                }
                            }
                        ]
                    });
                }, 2000);
            })
        };
    
        if(!response.ok) {
            console.error("Open AI API did not return a valid response");
            return null;
        }
    
        const json: ResponseObject = await response.json();
        // text response returned by GPT
        const textResponse = json?.choices?.[0]?.message?.content;

        if(!textResponse) {
            console.error("Open AI API did not return a valid response object");
            return null;
        }

        console.log(textResponse);
    
        const careers = [];
        for(const careerText of textResponse.split("\n")) { // careers are split onto different lines
            if(!careerText) continue; // skip any empty lines
            // career info is separated with three hashes
            const careerInfo = careerText.split("###").map(i => i.trim());
            // separate title and starting salary
            const nameAndSalary = careerInfo[0].split("-").map(i => i.trim());
            
            // create a career
            const career = {
                name: nameAndSalary[0],
                startingSalaryString: nameAndSalary[1],
                description: careerInfo[1],
                explanation: careerInfo[2]
            };
            // occasionally GPT doesn't return a proper explanation portion
            if(!career.explanation) { // if so, just use [1..] sentences as the explanation, leaving [0] as the description
                const descriptionSentencesRaw = careerInfo[1].split(".");
                const descriptionSentences = [];
    
                for(const sentence of descriptionSentencesRaw) {
                    if(sentence) descriptionSentences.push(sentence.trim());
                }
    
                career.description = descriptionSentences[0] + ".";
                career.explanation = descriptionSentences.slice(1).join(". ").trim();
            }
    
            careers.push(career); // add to our output list of careers
        }
    
        if(careers.length === 0) {
            console.error("Parsed career array is of length 0");
            return null;
        }

        return careers; // return our final list of careers :)
    }
    // sort careers by starting salary --> user story!
    careers.sort((a, b) => {
        return Number(a.startingSalaryString.replace(/\$|,/g, "")) -
            Number(b.startingSalaryString.replace(/\$|,/g, ""))
    });
    // get scores for pie chart
    // mostly reused code from the above function
    async function getUserScore(answers: string[], type: "basic" | "detailed"): Promise<number[] | null> {
        if(answers.length !== basicQuestions.length) {
            console.error("Responses array and questions array are of different lengths");
            return null;
        }

        const answersText = type === "basic" ?
            answers.map((r, i) => `${basicQuestions[i]} ${r}&&&`).join("\n").trim() :
            answers.map((r, i) => `${detailedQuestions[i]} ${r}&&&`).join("\n").trim();
    
        const postData = JSON.stringify({
            "model": "gpt-4.0-turbo", // gpt-4-turbo-preview
            "messages": [
                {
                    "role": "system",
                    "content": type === "basic" ? basicUserScoreSystem : detailedUserScoreSystem
                },
                {
                    "role": "user",
                    "content": answersText
                }
            ],
            "max_tokens": 400
        });
        const response = useApi ? await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem(saveKeyData) || "")}`
            },
            body: postData
        }) : {
            ok: true,
            json: async () => new Promise((res, _) => {
                setTimeout(() => {
                    res({
                        choices: [
                            {
                                message: {
                                    content: exampleResponseText
                                }
                            }
                        ]
                    });
                }, 2000);
            })
        };
    
        if(!response.ok) {
            console.error("Open AI API did not return a valid response");
            return null;
        }
    
        const json: ResponseObject = await response.json();
        const textResponse = json?.choices?.[0]?.message?.content;

        if(!textResponse) {
            console.error("Open AI API did not return a valid response object");
            return null;
        }

        console.log(textResponse);
        const regex: RegExp = /\d+(?=%)/g;  

            // Extract percent numbers from the text output from gpt
            const percentNumbers: number[] = [];
            let match;
            while ((match = regex.exec(textResponse)) !== null) {
                percentNumbers.push(parseInt(match[0], 10)); // parse numbers and add to our list
            }
            const userScores: number[] = percentNumbers;
            setScores(userScores);

            console.log(userScores);
                    return userScores;  // returns the list of numbers used to populate pie chart data
    };
    return (
        <div className="Results" ref = {contentRef}>
            <h1 className="center">Your Future Careers!</h1>
            <ol>
                {
                    careers
                        .map(c => (
                        <CareerDisplay career={c} key={c.name}/>
                    ))
                }
            </ol>
            <div className='piechart-wrapper'>
            <h1>Holland's Six Personality Types</h1>
            <ResultsPieChart stats={scores}></ResultsPieChart>
            </div>
            <ExportButton pdfContent = {contentRef}/>
            <button onClick={() => setCurrentPage("main")}>Return Home</button>
        </div>
    )
}

export default ResultsPage;

import { useState, useEffect } from "react";

import LoadingAnimation from "../components/LoadingAnimation";

import { Career, CareerDisplay } from "../components/CareerDisplay";
import { saveKeyData, Page } from "../App";
import { basicQuestions, detailedQuestions } from "../components/Question";

const useApi = false;

type ResponseObject = {
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
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);

    useEffect(() => {
        if(loading !== null) return;

        console.log("Contacting genie...");

        setLoading(true);

        const apiResponse = currentQuiz === "basic" ?
            getQuestionsResponse(basicAnswers, "basic") :
            getQuestionsResponse(detailedAnswers, "detailed");

        apiResponse.then(careerList => {
            if(careerList === null) {
                console.error("Cannot update results page");
                alert("Fatal error while contacting the genie. Try rubbing the lamp again in a few minutes.");
                return;
            }
    
            setCareers(careerList);
            setLoading(false);
        });
    }, [basicAnswers, detailedAnswers, currentQuiz, loading]);

    if(loading) {
        return <LoadingAnimation/>;
    }

    async function getQuestionsResponse(answers: string[], type: "basic" | "detailed"): Promise<Career[] | null> {
        if(answers.length !== basicQuestions.length) {
            console.error("Responses array and questions array are of different lengths");
            return null;
        }

        const answersText = type === "basic" ?
            answers.map((r, i) => `${basicQuestions[i]} ${r}&&&`).join("\n").trim() :
            answers.map((r, i) => `${detailedQuestions[i]} ${r}&&&`).join("\n").trim();
    
        const postData = JSON.stringify({
            "model": "gpt-3.5-turbo", // gpt-4-turbo-preview
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
    
        const careers = [];
        for(const careerText of textResponse.split("\n")) {
            if(!careerText) continue;
            
            const careerInfo = careerText.split("###").map(i => i.trim());
            const nameAndSalary = careerInfo[0].split("-").map(i => i.trim());
    
            const career = {
                name: nameAndSalary[0],
                startingSalaryString: nameAndSalary[1],
                description: careerInfo[1],
                explanation: careerInfo[2]
            };
    
            if(!career.explanation) {
                const descriptionSentencesRaw = careerInfo[1].split(".");
                const descriptionSentences = [];
    
                for(const sentence of descriptionSentencesRaw) {
                    if(sentence) descriptionSentences.push(sentence.trim());
                }
    
                career.description = descriptionSentences[0] + ".";
                career.explanation = descriptionSentences.slice(1).join(". ").trim();
            }
    
            careers.push(career);
        }
    
        if(careers.length === 0) {
            console.error("Parsed career array is of length 0");
            return null;
        }

        return careers;
    }

    console.log(careers);

    return (
        <div className="Results">
            <h1 className="center">Your Future Careers!</h1>
            {
                careers.map(c => (
                    <CareerDisplay career={c}/>
                ))
            }
            <button onClick={() => setCurrentPage("main")}>Return home</button>
        </div>
    )
}

export default ResultsPage;

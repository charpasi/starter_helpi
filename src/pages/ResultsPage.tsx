import { saveKeyData, Page } from "../App";

import { basicQuestions, detailedQuestions } from "../components/Question";

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

type Career = {
    name: string,
    startingSalaryString: string,
    description: string,
    explanation: string
}

const basicQuestionsSystem = `You are tasked with helping a user find the best career for them based on a questionnaire. You will be provided input as follows:

[Question 1 text]. [Response]&&&
[Question 2 text]. [Response]&&&
...

Response can be "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", or "Strongly agree". Each question and response will be separated by "&&&" as shown above.

Please format your responses in this format:
[Career name] - $[Starting salary]###[Short description of career]###[Short explanation as to why this career would be good]###

Please do not write anything else in your response other than information in the above format. Please respond with four different careers on different lines.`;

const detailedQuestionsSystem = `You are tasked with helping a user find the best career for them based on a questionnaire. You will be provided input as follows:

[Question 1 text]? [Response]&&&
[Question 2 text]? [Response]&&&
...

Each question and response will be separated by "&&&" as shown above.

Please format your responses in this format:
[Career name] - $[starting salary]###[Short description of career]###[Short explanation as to why this career would be good]###

Please do not write anything else in your response other than information in the above format. Please respond with four different careers on different lines.`;

function Results({
    setCurrentPage
}: {
    setCurrentPage: (pageName: Page) => void
}) {
    async function getQuestionsResponse(answers: string[], type: "basic" | "detailed"): Promise<Career[] | null> {
        if(answers.length !== basicQuestions.length) {
            console.error("Responses array and questions array are of different lengths");
            return null;
        }

        const answersText = type === "basic" ?
            answers.map((r, i) => `${basicQuestions[i]} ${r}`).join("\n").trim() :
            answers.map((r, i) => `${detailedQuestions[i]} ${r}`).join("\n").trim();
    
        const postData = JSON.stringify({
            "model": "gpt-3.5-turbo",
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
    
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem(saveKeyData) || "")}`
            },
            body: postData
        });
    
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
    
        const careers = [];
        for(const careerText of textResponse.split("\n\n")) {
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
    
        return careers;
    }

    function clickMe(): void {
        const exampleResponses = [
            "Strongly agree",
            "Neither agree nor disagree",
            "Agree",
            "Strongly agree",
            "Neither agree nor disagree",
            "Agree",
            "Disagree"
        ];

        const careers = getQuestionsResponse(exampleResponses, "basic");
        console.log(careers);
    }

    return (
        <div className="Results">
            <p>Results :3</p>
            <button onClick={() => clickMe()}>Send API request</button>
        </div>
    )
}

export default Results;

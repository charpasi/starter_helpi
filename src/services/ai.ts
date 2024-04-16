import { saveKeyData } from "../App"

const useRealApi = true;

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
    startingSalary: number,
    description: string,
    explanation: string
}

const basicQuestionsSystem = `You are tasked with helping a user find the best career for them based on a questionnaire. You will be provided input as follows:

[Question 1 text]. [Response]&&&
[Question 2 text]. [Response]&&&
...

Response can be "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", or "Strongly agree". Each question and response will be separated by "&&&" as shown above.

Please format your responses in this format:
[Career name] - $[starting salary]###
[Short description of career]###
[Short explanation as to why this career would be good]###

Please do not write anything else in your response other than information in the above format. Please respond with four different careers, separating each response with "&&&" on a new line.`;

const detailedQuestionsSystem = `You are tasked with helping a user find the best career for them based on a questionnaire. You will be provided input as follows:

[Question 1 text]? [Response]&&&
[Question 2 text]? [Response]&&&
...

Each question and response will be separated by "&&&" as shown above.

Please format your responses in this format:
[Career name] - $[starting salary]###
[Short description of career]###
[Short explanation as to why this career would be good]###

Please do not write anything else in your response other than information in the above format. Please respond with four different careers, separating each response with "&&&" on a new line.`;

async function getBasicQuestionsResponse(responses: string[]): Promise<Career[] | null> {
    const userResponse = `I express my creativity whenever I work. Strongly agree
I think more logically than emotionally when solving problems. Neither agree nor disagree
I naturally act as a leader and enjoy leading others to a common goal. Agree
I work well with others. Strongly agree
I excel with time management and prioritizing tasks. Neither agree nor disagree
I want my future career to involve helping others and making a positive impact on the community. Agree
Peers often look to me for guidance and advice. Disagree
`;

    const postData = JSON.stringify({
        "model": "gpt-4",
        "messages": [
            {
                "role": "system",
                "content": basicQuestionsSystem
            },
            {
                "role": "user",
                "content": userResponse
            }
        ]
    });

    const response = useRealApi ? await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(saveKeyData)}`
        },
        body: postData
    }) : { ok: true, json: () => "{}" };

    console.log(response);

    if(!response.ok) return null;

    const json: ResponseObject = await response.json();
    const textResponse = json.choices[0];

    console.log(textResponse);

    return null;
}

async function getDetailedQuestionsResponse(responses: string[]): Promise<void> {

}

export {
    getBasicQuestionsResponse,
    getDetailedQuestionsResponse
}

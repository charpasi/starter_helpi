import { saveKeyData } from "../App"

const useRealApi = false;

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

Please do not write anything else in your response other than information in the above format. Please respond with four different careers.`;

const debugBasicQuestionsResponse = `Graphic Designer - $40,000###Graphic designers use their creativity to develop visual concepts and communicate ideas through various types of media. This career would be a good fit because it allows you to express your creativity and make a positive impact through designs that can inspire or inform others.###

Project Manager - $60,000###Project managers lead teams to achieve specific goals within a certain timeframe and budget. Your natural leadership abilities and strong teamwork skills make this a great career option for you. You can help others succeed while ensuring projects are completed successfully.###

Social Worker - $45,000###As a social worker, you would work directly with individuals and communities to help improve their well-being and quality of life. Your desire to make a positive impact on the community aligns well with this career. You can use your strong interpersonal skills to support and assist those in need.###

Marketing Specialist - $50,000###Marketing specialists create strategies to promote products or services and engage with target audiences through various channels. Your ability to work well with others, think logically, and desire to make a positive impact can be beneficial in this career. You can use your creativity to develop impactful campaigns that reach and benefit a wide audience.###`

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
    const debugUserResponse = `I express my creativity whenever I work. Strongly agree
I think more logically than emotionally when solving problems. Neither agree nor disagree
I naturally act as a leader and enjoy leading others to a common goal. Agree
I work well with others. Strongly agree
I excel with time management and prioritizing tasks. Neither agree nor disagree
I want my future career to involve helping others and making a positive impact on the community. Agree
Peers often look to me for guidance and advice. Disagree`;

    const postData = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": basicQuestionsSystem
            },
            {
                "role": "user",
                "content": debugUserResponse
            }
        ],
        "max_tokens": 400
    });

    const response = useRealApi ? await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem(saveKeyData) || "")}`
        },
        body: postData
    }) : { ok: true, json: () => {
        return {
            choices: [
                {
                    message: {
                        content: debugBasicQuestionsResponse
                    }
                }
            ]
        }
    }};

    if(!response.ok) return null;

    const json: ResponseObject = await response.json();
    const textResponse = json.choices[0].message.content;

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

async function getDetailedQuestionsResponse(responses: string[]): Promise<void> {

}

export {
    getBasicQuestionsResponse,
    getDetailedQuestionsResponse
}

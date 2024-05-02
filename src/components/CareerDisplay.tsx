import "./CareerDisplay.css";

export type Career = {
    name: string,
    startingSalaryString: string,
    description: string,
    explanation: string
}

function CareerDisplay({ career }: { career: Career }) {
    return (
        <div className="CareerDisplay">
            <h2>{career.name} - {career.startingSalaryString}</h2>
            <p>{career.description}</p>
            <p>{career.explanation}</p>
        </div>
    );
}

export { // we can't export types like this for some reason...
    CareerDisplay
};

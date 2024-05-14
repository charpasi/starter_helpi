import React from 'react';
import "./ProgressBar.css";

interface ProgressBarProps {
    current: number;
    max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max }) => {
    const calculateProgress = () => {
        return (current / max) * 100;
    };
    return (
        <div className = "progress-wrapper">
        <progress className="progressBar" value={current} max={max}>
            {calculateProgress()}%
        </progress>
        <div className = "questionCount">
            <p>{current}/{max}</p>
        </div>
        </div>

    );
};

export default ProgressBar;

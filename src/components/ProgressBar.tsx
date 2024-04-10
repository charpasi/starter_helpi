import React, { useState } from 'react';
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
        <progress className="progressBar" value={current} max={max}>
            {calculateProgress()}%
        </progress>
    );
};

export default ProgressBar;

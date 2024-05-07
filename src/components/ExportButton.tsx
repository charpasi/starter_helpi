import { Button } from "react-bootstrap";
import "./ExportButton.css";
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'; 

export const ExportButton: React.FC<{ careers: string[] }> = ({ careers }) => {
    const contentRef = useRef<HTMLDivElement>(null); 
    const generatePDF = async () => {
        if (!contentRef.current) return;
        const canvas = await html2canvas(contentRef.current); 
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.75, canvas.width * 0.75);
        pdf.save('quiz_results.pdf');
    };  
    return (
        <div className="exportbutton-container">
            <div ref={contentRef} style={{ display: 'none' }}>
                <h1>Quiz Results</h1>
                <ul>
                    {careers.map((career, index) => <li key={index}>Question {index + 1}: {career}</li>)}
                </ul>
            </div>
            <Button onClick={generatePDF}>Save My Results</Button>
        </div>
    );
}

export default ExportButton;
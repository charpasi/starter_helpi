import React from "react";
import jsPDF from "jspdf";
import "./ExportButton.css";

interface ExportButtonProps {
  careers: string[];
}

function ExportButton({ careers }: ExportButtonProps) {
  const saveAsPDF = () => {
    const doc = new jsPDF();

    doc.text("Your Future Careers:", 10, 10);
    doc.text("Holland's Six Personality Types:", 10, 20);

    // careers list
    careers.forEach((career, index) => {
      doc.text(`${index + 1}. ${career}`, 10, 30 + index * 10);
    });

    // Add any additional content you want to include in the PDF
    doc.save("your-future-careers.pdf");
  };

  return (
    <div className="exportbutton-container">
    <button onClick={saveAsPDF}>Export Results as PDF</button>
    </div>
  );
}

export default ExportButton;

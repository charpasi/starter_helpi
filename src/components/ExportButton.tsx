import jsPDF from "jspdf";
import "./ExportButton.css";

interface ExportButtonProps {
  careers: string[];
}

function ExportButton({ careers }: ExportButtonProps) {
  const saveAsPDF = () => {
    const doc = new jsPDF();

    doc.text("Your Future Careers:", 10, 10);
    // careers list
    careers.forEach((career, index) => {
      doc.text(`${index + 1}. ${career}`, 10, 30 + index * 10);
    });
    doc.text("Holland's Six Personality Types:", 10, 20);
    doc.save("your-future-careers.pdf");
};

return (
  <button onClick={saveAsPDF}>Export as PDF</button>
);
}

export default ExportButton;
 
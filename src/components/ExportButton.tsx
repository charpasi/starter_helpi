import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ExportButton = () => {
  const pdfRef = useRef<HTMLDivElement>(null); 

  const downloadPDF = () => {
    const input = pdfRef.current;

    if (!input) {
      console.error("PDF reference not found");
      return;
    }

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // p = potrait orientation, mm = dimensions, a4 = print sheet style true = pdf optimization for file size
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("your-career-report.pdf");
    });
  };

  return (
    <div ref={pdfRef}>
      <div className="export-button-wrapper">
        <button className="export-button" onClick={downloadPDF}>
          Export Results as PDF
        </button>
      </div>
    </div>
  );
};

export default ExportButton;

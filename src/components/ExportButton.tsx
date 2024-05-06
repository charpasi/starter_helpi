import React from 'react';

const generatePdf = (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    html2pdf(element, {
      margin: 1,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  } else {
    console.error(`Element with id ${elementId} not found`);
  }
};

const MyComponent: React.FC = () => {
  const handleSaveAsPdf = () => {
    generatePdf('pdf-content', 'my_document.pdf');
  };

  return (
    <div>
      <div id="pdf-content">
        {/* Your page content here */}
        <h1>My PDF Content</h1>
        <p>This is the content that will be saved as a PDF.</p>
      </div>
      <button onClick={handleSaveAsPdf}>Save as PDF</button>
    </div>
  );
};

export default MyComponent;
function html2pdf(element: HTMLElement, arg1: { margin: number; filename: string; image: { type: string; quality: number; }; html2canvas: { dpi: number; letterRendering: boolean; }; jsPDF: { unit: string; format: string; orientation: string; }; }) {
    throw new Error('Function not implemented.');
}


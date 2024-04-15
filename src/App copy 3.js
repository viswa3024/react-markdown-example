import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const contentRef = useRef(null);

  const generatePDF = async () => {
    if (!contentRef.current) return;

    const contentHeight = contentRef.current.offsetHeight;
    const numPages = Math.ceil(contentHeight / window.innerHeight);

    const pdf = new jsPDF('p', 'mm', 'a4');

    for (let i = 0; i < numPages; i++) {
      const yOffset = window.innerHeight * i;
      const canvas = await html2canvas(contentRef.current, {
        scrollY: yOffset,
        windowHeight: window.innerHeight,
      });
      const imgData = canvas.toDataURL('image/png');

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'PNG', 0, 0);
    }

    pdf.save('generated.pdf');
  };

  const markdownContent = `
  # Hello, PDF!
  
  This is a sample PDF generated using jsPDF and html2canvas.
  
  ![Image](https://example.com/image.png)
  
  Lots of content...
  `.repeat(20); // Add more content to exceed the height of the viewport

  return (
    <div>
      <div ref={contentRef}>
        <ReactMarkdown children={markdownContent} />
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
}

export default App;

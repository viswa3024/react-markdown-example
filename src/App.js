import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const contentRef = useRef(null);
  const imagesRef = useRef({});

  useEffect(() => {
    const images = contentRef.current.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      const imgElement = new Image();
      imgElement.src = src;
      imgElement.onload = () => {
        imagesRef.current[src] = imgElement;
      };
    });
  }, []);

  const generatePDF = () => {
    if (!contentRef.current) return;

    html2canvas(contentRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      pdf.save('generated.pdf');
    });
  };

  const components = {
    img: ({ src, alt }) => {
      const image = imagesRef.current[src];
      if (image) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        return <img src={canvas.toDataURL()} alt={alt} />;
      }
      return <img src={src} alt={alt} />;
    },
  };

  const markdownContent = `
  # Hello, PDF!
  
  This is a sample PDF generated using jsPDF and html2canvas.
  
  ![Image](https://example.com/image.png)
  `;

  return (
    <div>
      <div ref={contentRef}>
        <ReactMarkdown components={components} children={markdownContent} />
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
}

export default App;

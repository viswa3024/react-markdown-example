import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import classes from './markdown-styles.module.css';
import copyToClipboard from 'copy-to-clipboard'; // Updated import


const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={15} height={15} stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
</svg>
);

const MarkdownComponent = () => {
  const contentRef = useRef(null);

  const [copyMessages, setCopyMessages] = useState({});

  const markdownText = `
  ## Code Examples

  Inline code: \`const example = 'Hello World!';\`

  \`\`\`javascript
  // Block code
  function greet(name) {
    return 'Hello, ' + name + '!';
  }
  greet('John');
  \`\`\`

  ## Example Markdown

This is a simple example of using \`react-markdown\` with \`remark-gfm\`.

- List item 1
- List item 2

| Name  | Age |
|-------|-----|
| John  | 25  |
| Alice | 30  |


## Data Representation

| Name   | Age | Status |
|--------|-----|--------|
| John   | 25  | Active |
| Alice  | 30  | Inactive |

- [x] Learn React
- [ ] Build a project
- [ ] Deploy to production


## Java Code Example

  \`\`\`java
  public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }
  \`\`\`

  This is a *simple* example of using \`react-markdown\` with \`remark-gfm\`.

  - List item 1
  - List item 2

  \`\`\`javascript
  console.log('Hello, React!');
  \`\`\`


  ## Features

  | Feature        | Status |
  | -------------- | ------ |
  | Tables         | ✔️     |
  | Task Lists     | ✔️     |
  | Strikethrough  | ✔️     |


  


  ## Styling Text

  ~~Strikethrough~~ and **bold text** and *italic text*.

  Combination of **bold and _italic_** text.


  ### Ordered List

1. Item 1
2. Item 2
3. Item 3

### Unordered List

- Bullet 1
- Bullet 2
- Bullet 3




## HTML Content Example

    This is some HTML content:

    <div style="color: red;">
      <p>This is a paragraph with <strong>strong</strong> and <em>emphasized</em> text.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>



    ## Bash Syntax Highlighting Example

    This is some Bash code:

    \`\`\`bash
    #!/bin/bash

    echo "Hello, World!"

    for i in {1..5}
    do
      echo "Count: \$i"
    done
    \`\`\`


## Links and Images

[Visit OpenAI](https://www.openai.com/)

![React Logo](https://reactjs.org/logo-og.png)

  `;

  const pageHeight = 297; // A4 page height in mm
  const pageWidth = 210; // A4 page width in mm

  // const generatePDF = () => {
  //   if (!contentRef.current) return;

  //   html2canvas(contentRef.current).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const imgWidth = 210;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= 297;

  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= 297;
  //     }

  //     pdf.save('generated.pdf');
  //   });
  // };

  // const generatePDF = async () => {
  //   if (!contentRef.current) return;

  //   const contentHeight = contentRef.current.offsetHeight;
  //   const pdf = new jsPDF('p', 'mm', 'a4');

  //   const dataUrl = await html2canvas(contentRef.current, {
  //     scrollY: 0,
  //     useCORS: true, // Enable CORS support
  //   }).then(canvas => canvas.toDataURL('image/png'));

  //   pdf.addImage(dataUrl, 'PNG', 0, 0);

  //   pdf.save('generated.pdf');
  // };

  // const generatePDF = async () => {
  //   if (!contentRef.current) return;

  //   const contentHeight = contentRef.current.offsetHeight;
  //   const numPages = Math.ceil(contentHeight / window.innerHeight);

  //   const pdf = new jsPDF('p', 'mm', 'a4');

  //   for (let i = 0; i < numPages; i++) {
  //     const yOffset = window.innerHeight * i;
  //     const canvas = await html2canvas(contentRef.current, {
  //       scrollY: yOffset,
  //       windowHeight: window.innerHeight,
  //     });
  //     const imgData = canvas.toDataURL('image/png');

  //     if (i > 0) {
  //       pdf.addPage();
  //     }

  //     pdf.addImage(imgData, 'PNG', 0, 0);
  //   }

  //   pdf.save('generated.pdf');
  // };

  // const generatePDF = async () => {
  //   if (!contentRef.current) return;

  //   const contentHeight = contentRef.current.offsetHeight;
  //   const viewportHeight = window.innerHeight;
  //   const numPages = Math.ceil(contentHeight / viewportHeight);

  //   const pdf = new jsPDF('p', 'mm', 'a4');

  //   for (let i = 0; i < numPages; i++) {
  //     const yOffset = viewportHeight * i;
  //     const canvas = await html2canvas(contentRef.current, {
  //       scrollY: yOffset,
  //       windowHeight: viewportHeight,
  //     });

  //     if (i > 0) {
  //       pdf.addPage();
  //     }

  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
  //   }

  //   pdf.save('generated.pdf');
  // };

  const generatePDF = async () => {
    if (!contentRef.current) return;

    const contentHeight = contentRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const numPages = Math.ceil(contentHeight / viewportHeight);

    const pdf = new jsPDF('p', 'mm', 'a4');

    for (let i = 0; i < numPages; i++) {
      const yOffset = viewportHeight * i;
      const canvas = await html2canvas(contentRef.current, {
        scrollY: yOffset,
        windowHeight: viewportHeight,
        x: 0,
        y: yOffset > contentHeight ? contentHeight - viewportHeight : yOffset,
        width: window.innerWidth,
        height: Math.min(viewportHeight, contentHeight - yOffset),
      });

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
    }

    pdf.save('generated.pdf');
  };

  // const generatePDF = async () => {
  //   if (!contentRef.current) return;

  //   const contentHeight = contentRef.current.offsetHeight;
  //   const numPages = Math.ceil(contentHeight / pageHeight);

  //   const pdf = new jsPDF('p', 'mm', 'a4');

  //   for (let i = 0; i < numPages; i++) {
  //     const yPosition = -pageHeight * i;
  //     const dataUrl = await html2canvas(contentRef.current, {
  //       scrollY: -yPosition,
  //     }).then(canvas => canvas.toDataURL('image/png'));

  //     if (i > 0) {
  //       pdf.addPage();
  //     }

  //     pdf.addImage(dataUrl, 'PNG', 0, 0, pageWidth, pageHeight);
  //   }

  //   pdf.save('generated.pdf');
  // };

  // const generatePDF = () => {
  //   if (!contentRef.current) return;

  //   html2canvas(contentRef.current).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const imgWidth = 210;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= 297;

  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= 297;
  //     }

  //     pdf.save('generated.pdf');
  //   });
  // };

  const TableComponent = ({ children }) => {
    return <table className={classes.customTable}>{children}</table>;
  };

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <img src={image.properties.src} alt={image.alt} width={800} height={400} />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');

      if (!inline && match) {
        const codeString = String(children).replace(/\n$/, '');

        const handleClick = () => {
          const uniqueKey = `${match[1]}-${codeString}`; // Create a unique key
          copyToClipboard(codeString);
          setCopyMessages((prevMessages) => ({
            ...prevMessages,
            [uniqueKey]: 'Code copied to clipboard!',
          }));
          setTimeout(() => setCopyMessages((prevMessages) => ({ ...prevMessages, [uniqueKey]: null })), 2000);
        };

        return (
          <div className="code-block">
            <button className="copy-button" onClick={handleClick}>
            <CopyIcon /> Copy
          </button>
            <SyntaxHighlighter style={atomDark} PreTag="div" language={match[1]} {...props}>
              {codeString}
            </SyntaxHighlighter>
            {copyMessages[`${match[1]}-${codeString}`] && (
            <div className="copy-message">{copyMessages[`${match[1]}-${codeString}`]}</div>
          )}
          </div>
        );
      }

      return <code className={className} {...props}>{children}</code>;
    },
    table: TableComponent,
  };

  return (
    <div ref={contentRef}>
      <ReactMarkdown components={customRenderers} remarkPlugins={[remarkGfm]}>
        {markdownText}
      </ReactMarkdown>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default MarkdownComponent;

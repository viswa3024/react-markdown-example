import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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




  \`\`\`javascript
  // Block code
  function greet(name) {
    return 'Hello, World' + name + '!';
  }
  greet('John');
  \`\`\`
  `;

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
    <div>
      <ReactMarkdown components={customRenderers} remarkPlugins={[remarkGfm]}>
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import classes from './markdown-styles.module.css';
import copyToClipboard from 'copy-to-clipboard'; // Updated import

const MarkdownComponent = () => {
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

        return (
          <div className="code-block">
            <button
          className="copy-button"
          onClick={(e) => {
            e.preventDefault();
            copyToClipboard(codeString);
            alert('Copied to clipboard!');
          }}
        >
          Copy
        </button>
            <SyntaxHighlighter style={atomDark} PreTag="div" language={match[1]} {...props}>
              {codeString}
            </SyntaxHighlighter>
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

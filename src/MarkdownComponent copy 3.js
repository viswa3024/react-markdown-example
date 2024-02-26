import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownComponent = () => {
  const markdownText = `
  ## Example Markdown

  This is a simple example of using \`react-markdown\` with \`remark-gfm\`.
  
  - List item 1
  - List item 2
  
  | Name  | Age |
  |-------|-----|
  | John  | 25  |
  | Alice | 30  |
  `;

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;


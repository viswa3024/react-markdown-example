import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownComponent = () => {
  const markdownText = `
  ## Links and Images

  [Visit OpenAI](https://www.openai.com/)

  ![React Logo](https://reactjs.org/logo-og.png)
  `;

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;


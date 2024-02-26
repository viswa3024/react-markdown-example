import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownComponent = () => {
  const markdownText = `
  ## Additional Features

  This is a sentence with a footnote.[^1]

  This is a sentence with a superscript: 2^(10).

  [^1]: Here is the footnote text.
  `;


  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;


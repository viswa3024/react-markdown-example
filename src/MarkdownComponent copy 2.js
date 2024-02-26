import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownComponent = () => {
  const markdownText = `
    ## Lists Example

    ### Ordered List

    1. Item 1
    2. Item 2
    3. Item 3

    ### Unordered List

    - Bullet 1
    - Bullet 2
    - Bullet 3
  `;

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;


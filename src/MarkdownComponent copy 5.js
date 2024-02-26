import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownComponent = () => {
  const markdownText = `
  ## Data Representation

  | Name   | Age | Status |
  |--------|-----|--------|
  | John   | 25  | Active |
  | Alice  | 30  | Inactive |

  - [x] Learn React
  - [ ] Build a project
  - [ ] Deploy to production
  `;

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;


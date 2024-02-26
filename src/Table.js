import React from 'react';

const Table = ({ children }) => {
  return (
    <table>
      <thead>
        {children[0] && React.isValidElement(children[0]) && (
          <tr>{React.Children.map(children[0].props.children, (header, index) => <th key={index}>{header}</th>)}</tr>
        )}
      </thead>
      <tbody>
        {children.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {React.Children.map(row.props.children, (cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

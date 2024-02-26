import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
//import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; 

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







    ## Bash Syntax Highlighting Example

    This is some Bash code:

    \`\`\`bash
    #!/bin/bash

    echo "Hello, World!"

    for i in {1..5}
    do
      echo "Count: $i"
    done
    \`\`\`


## Links and Images

[Visit OpenAI](https://www.openai.com/)

![React Logo](https://reactjs.org/logo-og.png)


# Programming Languages Example

## JavaScript

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");
\`\`\`

## Python

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
\`\`\`

## Java

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## Bash

\`\`\`bash
#!/bin/bash

echo "Hello, World!"

for i in {1..5}
do
  echo "Count: $i"
done
\`\`\`

## HTML

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
\`\`\`

## SQL

\`\`\`sql
SELECT * FROM users WHERE age > 18;
\`\`\`

## Ruby

\`\`\`ruby
def greet(name)
  puts "Hello, #{name}!"
end

greet("World")
\`\`\`


# Programming Languages Example

## JavaScript

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");
\`\`\`

## Python

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
\`\`\`

## Java

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## Bash

\`\`\`bash
#!/bin/bash

echo "Hello, World!"

for i in {1..5}
do
  echo "Count: $i"
done
\`\`\`

## HTML

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
\`\`\`

## SQL

\`\`\`sql
SELECT * FROM users WHERE age > 18;
\`\`\`

## Ruby

\`\`\`ruby
def greet(name)
  puts "Hello, #{name}!"
end

greet("World")
\`\`\`

## C

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

## Swift

\`\`\`swift
func greet(name: String) {
    print("Hello, (name)!")
}

greet(name: "World")
\`\`\`

## TypeScript

\`\`\`typescript
function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");
\`\`\`

## PHP

\`\`\`php
<?php

function greet($name) {
    echo "Hello, $name!";
}

greet("World");
\`\`\`

## Kotlin

\`\`\`kotlin
fun greet(name: String) {
    println("Hello, $name!")
}

greet("World")
\`\`\`


~~~js
console.log('It works!')
~~~


  `;

  return (
    <div>
      {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown> */}
      <ReactMarkdown 
      skipHtml={false}
      //remarkPlugins={[remarkGfm]}
      remarkPlugins={[remarkGfm]}
      //rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <SyntaxHighlighter style={atomDark} PreTag="div"  language={match[1]} {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdownText}
    </ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;


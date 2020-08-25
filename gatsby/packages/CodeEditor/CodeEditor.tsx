import * as React from "react"
import styled, { css } from "styled-components"
import * as polished from "polished"
import Highlight, { defaultProps } from "prism-react-renderer"
import { mdx } from "@mdx-js/react"

import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"

export const reactLiveHome = {
  plain: {
    color: "#e7d2ed",
  },
  styles: [
    {
      types: ["prolog", "comment", "doctype", "cdata"],
      style: {
        color: "hsl(30, 20%, 50%)",
      },
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: { color: "#f677e1" },
    },
    {
      types: ["attr-name", "string", "char", "builtin", "insterted"],
      style: {
        color: "hsl(75, 70%, 70%)",
      },
    },
    {
      types: [
        "operator",
        "entity",
        "url",
        "string",
        "variable",
        "language-css",
      ],
      style: {
        color: "hsl(40, 90%, 70%)",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "rgb(255, 85, 85)",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["regex", "important"],
      style: {
        color: "#e90",
      },
    },
    {
      types: ["atrule", "attr-value", "keyword"],
      style: {
        color: "#f677e1",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        opacity: "0.7",
      },
    },
  ],
}

// @ts-ignore
const Container = styled.div`
  margin: 0 auto;
  max-width: 100%;
  background: #12005e;
  width: ${polished.rem(1024)};
  padding: ${polished.rem(20)};
  padding-bottom: ${polished.rem(20)};
  text-align: center;
`
// @ts-ignore
const StyledProvider = styled(LiveProvider)`
  border-radius: ${polished.rem(3)};
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;
  margin-bottom: ${polished.rem(100)};
`
// @ts-ignore
const LiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`
// @ts-ignore
const RenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 300px) {
    flex-direction: column;
  }
`

const column = css`
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;
  @media (max-width: 600px) {
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`
// @ts-ignore
const StyledEditor = styled.div`
  font-family: "Source Code Pro", monospace;
  font-size: ${polished.rem(14)};
  height: ${polished.rem(350)};
  max-height: ${polished.rem(350)};
  overflow: auto;
  ${column};
  * > textarea:focus {
    outline: none;
  }
`
//@ts-ignore
const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  ${column};
`
//@ts-ignore
const StyledError = styled(LiveError)`
  display: block;
  padding: ${polished.rem(8)};
  padding-bottom: 0;
  background: red;
  color: white;
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
  font-family: "Source Code Pro", monospace;
`

export const CodeEditor: React.FC<{
  live?: boolean
  render?: boolean
  className?: string
}> = ({ children, live, render, className }) =>
  live ? (
    <Container>
      <StyledProvider
        code={String(children).trim()}
        transformCode={(code: string) => "/** @jsx mdx */" + code}
        theme={reactLiveHome}
        scope={{ mdx }}
      >
        <LiveWrapper>
          <StyledEditor>
            <LiveEditor />
          </StyledEditor>
          <StyledPreview />
        </LiveWrapper>
        <StyledError />
      </StyledProvider>
    </Container>
  ) : render ? (
    <Container>
      <StyledProvider code={String(children).trim()} scope={{ mdx }}>
        <RenderWrapper>
          <StyledPreview />
        </RenderWrapper>
      </StyledProvider>
    </Container>
  ) : (
    <Highlight
      {...defaultProps}
      code={String(children).trim()}
      language={className?.replace(/language-/, "") as any}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )

import * as React from "react"
import styled, { css } from "styled-components"
import * as polished from "polished"

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

const Container = styled.div`
  margin: 0 auto;
  max-width: 100%;
  background: #12005e;
  width: ${polished.rem(1024)};
  padding: ${polished.rem(20)};
  padding-bottom: ${polished.rem(20)};
  text-align: center;
`

const StyledProvider = styled(LiveProvider)`
  border-radius: ${polished.rem(3)};
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;
  margin-bottom: ${polished.rem(100)};
`

const LiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  @media (max-width: 600px) {
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

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  ${column};
`

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

export const CodeEditor: React.FC<{ code: string }> = ({ code, children }) => (
  <Container>
    <StyledProvider code={code} theme={reactLiveHome}>
      <LiveWrapper>
        <StyledEditor>
          <LiveEditor />
        </StyledEditor>
        <StyledPreview />
      </LiveWrapper>
      <StyledError />
    </StyledProvider>
  </Container>
)

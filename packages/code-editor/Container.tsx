import * as polished from "polished";
import Paper from "@material-ui/core/Paper";
import styled, { css } from "styled-components";
import { LiveError, LivePreview, LiveProvider } from "react-live";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 100%;
  background: #12005e;
  width: ${polished.rem(1024)};
  padding: ${polished.rem(20)};
  padding-bottom: ${polished.rem(20)};
  text-align: center;
`;
export const StyledProvider = styled(LiveProvider)`
  border-radius: ${polished.rem(3)};
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;
  margin-bottom: ${polished.rem(100)};
`;
// @ts-ignore
const LiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
// @ts-ignore
export const RenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 300px) {
    flex-direction: column;
  }
`;
const column = css`
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;
  @media (max-width: 600px) {
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`;
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
`;
//@ts-ignore
export const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  ${column};
`;
//@ts-ignore
const StyledError = styled(LiveError)`
  display: block;
  padding: ${polished.rem(8)};
  background-color: black;
  padding-bottom: 0;
  background: red;
  color: white;
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
  font-family: "Source Code Pro", monospace;
`;
export const StyledEditorPaper = styled(Paper)`
  color: white;
  font-size: large;
  background-color: transparent !important;
  background-image: linear-gradient(to right bottom, #34294f 0%, #2a2139 30%);
`;
export const StyledLiveErrorPaper = styled(Paper)`
  color: white;
  font-size: large;
  background-color: transparent !important;
  background-image: linear-gradient(to right top, red 0%, #2a2139 30%);
`;
export const StyledPreviewPaper = styled(Paper)`
  color: black;
  padding: 10px;
  background-color: grey !important;
`;

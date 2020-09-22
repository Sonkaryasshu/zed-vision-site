import * as polished from "polished";
import styled, { css } from "styled-components";
import { LivePreview, LiveProvider } from "react-live";

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

export const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  ${column};
`;

export const StyledEditorDiv = styled.div`
  color: white;
  font-size: large;
  background-color: transparent !important;
  background-image: linear-gradient(to right bottom, #34294f 0%, #2a2139 30%);
`;
export const StyledLiveErrorDiv = styled.div`
  color: white;
  font-size: large;
  background-color: transparent !important;
  background-image: linear-gradient(to right top, red 0%, #2a2139 30%);
`;

export const StyledPreviewDiv = styled.div`
  color: black;
  padding: 10px;
  background-color: grey !important;
`;

import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const StyledContent = styled.main`
max-width: 1140px;
margin: auto;
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <StyledContent>
        {children}
      </StyledContent>
    </React.Fragment>
  );
};

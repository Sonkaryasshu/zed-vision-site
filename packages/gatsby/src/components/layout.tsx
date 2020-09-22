import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import styled from "styled-components";

interface Props {
  location: Location;
  title: string;
}

const StyledContent = styled.div`
max-width: 1140px;
margin: auto;
`;

const Layout: React.FC<Props> = ({ location, title, children }) => {
  let __PATH_PREFIX__;

  const rootPath = `${__PATH_PREFIX__}/`;
  let header = (
    <h1>
      <Link to={`/`}>{title}</Link>
    </h1>
  );
  if (!(location && location.pathname)) header = <React.Fragment />;
  else if (location.pathname === rootPath) {
    header = (
      <h1>
        <Link to={`/`}>{title}</Link>
      </h1>
    );
  } else {
    header = (
      <h2>
        <Link to={`/`}>{title}</Link>
      </h2>
    );
  }
  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <StyledContent>
        <header>{header}</header>
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}, Zed vision</footer>
      </StyledContent>
    </React.Fragment>
  );
};

export default Layout;

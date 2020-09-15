import * as React from "react";
import { CodeEditor } from "@zed-vision/code-editor/CodeEditor";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";

const components = {
  pre: function PreComp(props: any) {
    return <div {...props} />;
  },
  code: CodeEditor,
};

const CustomLayout: React.FC = ({ children }) => (
  <>
    <Helmet>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Helmet>
    <MDXProvider components={components}>
      <div style={{ maxWidth: 1140, margin: "auto" }}>{children}</div>
    </MDXProvider>
  </>
);

interface Props {
  location: Location;
  title: string;
}

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
    <CustomLayout>
      <header>{header}</header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}, Zed vision</footer>
    </CustomLayout>
  );
};

export default Layout;

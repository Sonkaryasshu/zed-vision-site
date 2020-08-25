import * as React from "react"
import { Helmet } from "react-helmet"
import { MDXProvider } from "@mdx-js/react"
import { CodeEditor } from "../packages/CodeEditor/CodeEditor"

const components = {
  pre: function PreComp(props: any) {
    return <div {...props} />
  },
  code: CodeEditor,
}

const Layout: React.FC = ({ children }) => (
  <>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Helmet>
    <MDXProvider components={components}>
      <div style={{ maxWidth: 1024, margin: "auto" }}>{children}</div>
    </MDXProvider>
  </>
)

export default Layout

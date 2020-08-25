import { Link } from "gatsby"
import * as React from "react"
import { Helmet } from "react-helmet"
import { MDXProvider } from "@mdx-js/react"
import { CodeEditor } from "../../packages/CodeEditor/CodeEditor"

const components = {
  pre: function PreComp(props: any) {
    return <div {...props} />
  },
  code: CodeEditor,
}

const CustomLayout: React.FC = ({ children }) => (
  <>
    <Helmet>
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Helmet>
    <MDXProvider components={components}>
      <div style={{ maxWidth: 1024, margin: "auto" }}>{children}</div>
    </MDXProvider>
  </>
)

interface Props {
  location: Location
  title: string
}

const Layout: React.FC<Props> = ({ location, title, children }) => {
  let __PATH_PREFIX__

  const rootPath = `${__PATH_PREFIX__}/`
  let header = (
    <h1>
      <Link to={`/`}>{title}</Link>
    </h1>
  )
  if (!(location && location.pathname)) header = <React.Fragment />
  else if (location.pathname === rootPath) {
    header = (
      <h1>
        <Link to={`/`}>{title}</Link>
      </h1>
    )
  } else {
    header = (
      <h2>
        <Link to={`/`}>{title}</Link>
      </h2>
    )
  }
  return (
    <CustomLayout>
      <header>{header}</header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}, Zed vision</footer>
    </CustomLayout>
  )
}

export default Layout

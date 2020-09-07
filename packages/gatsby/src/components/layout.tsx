import * as React from 'react';
import { animated, useSpring } from 'react-spring';
import { CodeEditor } from '@zed-vision/code-editor/CodeEditor';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

const components = {
  pre: function PreComp(props: any) {
    return <div {...props} />
  },
  code: CodeEditor,
}

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
)

interface Props {
  location: Location
  title: string
}

const Layout: React.FC<Props> = ({ location, title, children }) => {
  let __PATH_PREFIX__

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  })

  const rootPath = `${__PATH_PREFIX__}/`
  let header = (
    //@ts-ignore
    <animated.h1 style={props}>
      <Link to={`/`}>{title}</Link>
    </animated.h1>
  )
  if (!(location && location.pathname)) header = <React.Fragment />
  else if (location.pathname === rootPath) {
    header = (
      //@ts-ignore
      <animated.h1 style={props}>
        <Link to={`/`}>{title}</Link>
      </animated.h1>
    )
  } else {
    header = (
      //@ts-ignore
      <animated.h2 style={props}>
        <Link to={`/`}>{title}</Link>
      </animated.h2>
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

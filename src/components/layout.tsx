import React from "react"
import { Link } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
import { LazyThing } from "./LazyThing"
import RebassLayout from "../Layout"

const sharedComponents = {
  // BigRedButton,
  LazyThing,
}

/** @jsx jsx */ jsx
import { jsx } from "@emotion/core"
import { Heading, Box } from "rebass"

interface Props {
  location: Location
  title: string
}

const Layout: React.FC<Props> = ({ location, title, children }) => {
  let __PATH_PREFIX__

  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <Heading>
        <Link to={`/`}>{title}</Link>
      </Heading>
    )
  } else {
    header = (
      <Heading fontSize={[5, 6, 7]}>
        <Link to={`/`}>{title}</Link>
      </Heading>
    )
  }
  return (
    <RebassLayout>
      {" "}
      <Box>
        <header>{header}</header>
        <main>
          <MDXProvider components={sharedComponents}>{children}</MDXProvider>
        </main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Box>
    </RebassLayout>
  )
}

export default Layout

import React from "react"
import { Link } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
// import { BigRedButton } from "./atoms/Button"
import { LazyThing } from "./LazyThing"

const sharedComponents = {
  // BigRedButton,
  LazyThing,
}

import { rhythm, scale } from "../utils/typography"
/** @jsx jsx */ jsx
import { jsx } from "@emotion/core"

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
      <h1
        css={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          css={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        css={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          css={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      css={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>
        <MDXProvider components={sharedComponents}>{children}</MDXProvider>
      </main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout

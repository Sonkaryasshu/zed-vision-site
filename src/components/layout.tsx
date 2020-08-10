import React from "react"
import { Link } from "gatsby"

import CustomLayout from "../Layout"

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

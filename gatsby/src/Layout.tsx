import * as React from "react"
import { Helmet } from "react-helmet"
import CssBaseline from "@material-ui/core/CssBaseline"
import { getStyle } from "./style-synthwave84"

const Layout: React.FC = ({ children }) => (
  <>
    <CssBaseline>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <style type="text/css">{getStyle()}</style>
      </Helmet>

      <div style={{ maxWidth: 1024, margin: "auto" }}>{children}</div>
    </CssBaseline>
  </>
)

export default Layout

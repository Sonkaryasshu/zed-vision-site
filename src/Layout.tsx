import * as React from "react"
import { ThemeProvider } from "emotion-theming"
import theme from "@rebass/preset"
import { Helmet } from "react-helmet"
import CssBaseline from "@material-ui/core/CssBaseline"

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
    <CssBaseline />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
)

export default Layout

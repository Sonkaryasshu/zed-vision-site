import * as React from "react"
import { ThemeProvider } from "emotion-theming"
import theme from "@rebass/preset"

const DefaultTheme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default DefaultTheme

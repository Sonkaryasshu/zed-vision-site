import * as React from "react"
import { Box } from "./Box"

export const Container: React.FC = ({ children }) => (
  <Box
    fontSize={3}
    fontWeight="bold"
    p={3}
    mb={[4, 5]}
    color="primary"
    bg="secondary"
  >
    {children}
  </Box>
)

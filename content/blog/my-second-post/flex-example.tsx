import * as React from "react"
import { Flex, Box, Text } from "rebass"
import { Button } from "@material-ui/core"

const Example = () => (
  <Flex flexWrap="wrap" mx={-2}>
    <Box px={2} py={2} width={1 / 2}>
      <Text p={1} color="background" bg="primary">
        <Button>Helllo</Button>
      </Text>
    </Box>
    <Box px={2} py={2} width={1 / 2}>
      <Text p={1} color="background" bg="primary">
        1/2
      </Text>
    </Box>
    <Box px={2} py={2} width={1 / 3}>
      <Text p={1} color="background" bg="primary">
        1/3
      </Text>
    </Box>
    <Box px={2} py={2} width={1 / 3}>
      <Text p={1} color="background" bg="primary">
        1/3
      </Text>
    </Box>
    <Box px={2} py={2} width={1 / 3}>
      <Text p={1} color="background" bg="primary">
        1/3
      </Text>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <Text p={1} color="background" bg="primary">
        1/4
      </Text>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <Text p={1} color="background" bg="primary">
        1/4
      </Text>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <Text p={1} color="background" bg="primary">
        1/4
      </Text>
    </Box>
    <Box px={2} py={2} width={1 / 4}>
      <Text p={1} color="background" bg="primary">
        1/4
      </Text>
    </Box>
  </Flex>
)
export default Example

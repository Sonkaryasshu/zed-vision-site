import * as React from "react"

const increaseCounter = ([counter, setCounter]) => () =>
  setCounter(counter + 1)()

export const Counter = () => {
  const state = React.useState(0)

  const [counter] = state

  const actions = {
    increase: increaseCounter(state),
  }

  return <h3 onClick={actions.increase}>Counter: {counter}</h3>
}

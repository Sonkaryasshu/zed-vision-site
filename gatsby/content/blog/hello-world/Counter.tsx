import * as React from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"

const Counter = `() => {
  const [state, setState] = React.useState({counter: 0})

  const actions = {
    increase: ()=>setState({...state, counter: state.counter + 1}),
  }

  return <h3 onClick={actions.increase}>Counter: {state.counter}</h3>}`

export const EditCounter: React.FC = ({ children }) => (
  <>
    <LiveProvider code={Counter}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  </>
)

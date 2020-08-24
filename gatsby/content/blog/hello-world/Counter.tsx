import { CodeEditor } from "./CodeEditor"
import * as React from "react"

export const Counter = () => (
  <CodeEditor
    code={`
() => {
    const [state, setState] = React.useState({counter: 0})
    
    const actions = {
    increase: ()=>setState({...state, counter: state.counter + 1}),
    }
    
    return <h3 onClick={actions.increase}>
        Counter: {state.counter}
        </h3>
}`}
  ></CodeEditor>
)

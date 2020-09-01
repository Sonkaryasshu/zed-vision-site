import * as React from "react"

interface CounterState {
  counter: number
}

export const Counter = () => {
  const [events, setEvents] = React.useState([])

  const defaultState = def => events.reduce((state, ev) => ev(state), def)
  const dispatch = e => setEvents([...events, e])

  const CounterExample = dispatch => {
    const state = defaultState({ counter: 0 })

    const actions = {
      decrease: state => ({ ...state, counter: state.counter - 1 }),
      double: state => ({ ...state, counter: state.counter * 2 }),
      increase: state => ({ ...state, counter: state.counter + 1 }),
    }

    return (
      <div>
        <button onClick={() => dispatch(actions.decrease)}>-</button>
        <button onClick={() => dispatch(actions.double)}> x 2</button>
        Counter:
        <span>{state.counter}</span>
        <button onClick={() => dispatch(actions.increase)}>+</button>
      </div>
    )
  }
  return CounterExample(dispatch)
}

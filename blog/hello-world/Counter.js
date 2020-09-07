import React from "react"

export const Counter = () => {
  const actions = {
    decrease: state => ({ counter: state.counter - 1 }),
    double: state => ({ counter: state.counter * 2 }),
    increase: state => ({ counter: state.counter + 1 }),
  }

  const [events, setEvents] = React.useState([])

  const state = events.reduce((state, ev) => actions[ev](state), { counter: 0 })

  return (
    <div>
      <button onClick={() => setEvents([...events, "decrease"])}>-</button>
      <button onClick={() => setEvents([...events, "double"])}>x 2</button>
      Counter:
      <span>{state.counter}</span>
      <button onClick={() => setEvents([...events, "increase"])}>+</button>
    </div>
  )
}

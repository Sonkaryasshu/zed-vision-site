import React from "react"

export const Counter = () => {
  const actions = {
    decrease: state => ({ counter: state.counter - 1 }),
    double: state => ({ counter: state.counter * 2 }),
    increase: state => ({ counter: state.counter + 1 }),
  }

  const [events, setEvents] = React.useState([])

  const state = events.reduce((state, ev) => actions[ev](state), { counter: 0 })

  const onClick = e => {
    const text = String(e.target.innerText)

    if (text.includes("-")) setEvents([...events, "decrease"])
    else if (text.includes("+")) setEvents([...events, "increase"])
    else if (text.includes("x2")) setEvents([...events, "double"])
  }
  return (
    <>
      <button onClick={e => onClick(e)}>-</button>
      <button onClick={e => onClick(e)}>x2</button>
      Counter:
      <span>{state.counter}</span>
      <button onClick={e => onClick(e)}>+</button>
    </>
  )
}

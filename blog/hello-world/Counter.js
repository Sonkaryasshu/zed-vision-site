import React from "react"

export function Counter(props) {
  const actions = {
    decrease: state => ({ counter: state.counter - 1 }),
    double: state => ({ counter: state.counter * 2 }),
    increase: state => ({ counter: state.counter + 1 }),
  }
  const pastEvents = props.pastEvents || []

  const [events, setEvents] = React.useState(pastEvents)

  const state = events
    .map(ev => {
      const text = ev.target
      if (text.includes("-")) return "decrease"
      else if (text.includes("+")) return "increase"
      else if (text.includes("x2")) return "double"
    })
    .reduce((state, ev) => actions[ev](state), { counter: 0 })

  const onClick = e =>
    setEvents([
      ...events,
      { type: "click", target: String(e.target.innerHTML) },
    ])

  return (
    <div>
      <button onClick={e => onClick(e)}>-</button>
      <button onClick={e => onClick(e)}>x2</button>
      Counter {props.name}:<span>{state.counter}</span>
      <button onClick={e => onClick(e)}>+</button>
    </div>
  )
}

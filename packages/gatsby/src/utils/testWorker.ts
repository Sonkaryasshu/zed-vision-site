import React from "react"
import ReactDOM from "react-dom"

export const register = () => {
  const worker = new Worker("/workerComponent.js")

  const pastEvents = new Array(100000).fill({
    target: "+",
    type: "click",
  }) as any

  worker.postMessage({
    code: `function Counter(props){
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
      setEvents([...events, { type: "click", target: String(e.target.innerHTML) }])
  
    return (
      <div>
        <button onClick={e => onClick(e)}>-</button>
        <button onClick={e => onClick(e)}>x2</button>
        Counter {props.name}:<span>{state.counter}</span>
        <button onClick={e => onClick(e)}>+</button>
      </div>
    )
  }
`,
    pastEvents,
  })

  let el: Element
  let reactEl: any

  const hydrate = () => {
    // await isReady
    ReactDOM.hydrate(reactEl, el)
    console.log("hydrate")
  }

  worker.onmessage = d => {
    if (d.data.domString) {
      el = document.createElement("div")
      el.innerHTML = d.data.domString

      document.body.appendChild(el)
      if (reactEl) hydrate()
    }
    if (d.data.code) {
      const { code } = d.data
      const Counter = new Function(
        "props",
        `return (${code})(props)`
      ) as React.FC

      reactEl = React.createElement(Counter, { pastEvents: pastEvents } as any)
      if (el) hydrate()
    }
  }
}

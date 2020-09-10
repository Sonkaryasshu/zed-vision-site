export const register = () => {
  const worker = new Worker("/workerComponent.js")

  const pastEvents = new Array(100000).fill({
    target: "+",
    type: "click",
  }) as any

  const counter = `function Counter(props){
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
`

  worker.postMessage({
    code: counter,
    pastEvents,
  })

  const ret = {
    innerHTML: "",
    code: counter,
    compiledCode: "",
    pastEvents: [],
  }

  // const React = (await import("react")).default
  // const ReactDOM = await import("react-dom")

  worker.onmessage = d => {
    if (d.data.domString) {
      console.log(d.data.domString)
      // el = document.createElement("div")
      ret.innerHTML = d.data.domString
      // document.body.appendChild(el)
      // if (reactEl) hydrate()
    }
    if (d.data.code) {
      ret.compiledCode = d.data.code
      // const { code } = d.data
      // const Counter = (new Function(
      //   "props",
      //   `return (${code})(props)`
      // ) as unknown) as React.FC<{ pastEvents: [] }>

      // const Counter = props => counterFN(props)
      // ReactDOM.hydrate(<Counter pastEvents={pastEvents} />, el)
    }
  }

  return () => ({ ...ret })
}

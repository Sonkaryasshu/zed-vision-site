importScripts(
  "https://unpkg.com/@ampproject/worker-dom@0.26.0/dist/worker/worker.js"
)
importScripts("https://unpkg.com/react@16/umd/react.development.js")
importScripts("https://unpkg.com/react-dom@16/umd/react-dom.development.js")
importScripts("react-dom-server.browser.development.js")
importScripts("https://unpkg.com/@babel/standalone/babel.min.js")

console.log(Babel.availablePresets["react"])

const code = Babel.transform(
  `function Counter(props){
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
      
      console.log(events)
  
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
  {
    plugins: [],
    presets: ["react"],
  }
).code

const webRunner = {
  el: null,
  document: null,
  onHeaderClick: null,
}

const pastEvents = []

const render = () => {
  const window = (this.window = WorkerThread.workerDOM)

  var Counter = new Function("props", `return (${code})(props)`)

  const document = WorkerThread.workerDOM.document

  const str = ReactDOMServer.renderToString(
    React.createElement(Counter, { pastEvents: pastEvents })
  )

  postMessage({ domString: str })
  postMessage({ code, pastEvents })
}
render()

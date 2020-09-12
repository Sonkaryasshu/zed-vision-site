// import * as React from "react"
// import ReactDOM from "react-dom"

export const register = () => {
  if (typeof window == `undefined`) {
    return () => ({
      innerHTML: "",
      code: "",
      compiledCode: "",
      pastEvents: [],
    })
  }

  const sha256Worker = new Worker("/shaWorker.js")

  const worker = new Worker("/workerComponent.js")

  const WC = new MessageChannel()

  WC.port2.onmessage = sha256Worker.postMessage

  sha256Worker.postMessage({ id: 22, data: "xjjxiwhdewh" })

  worker.postMessage(
    {
      shaPort: WC.port1,
    },
    [WC.port1]
  )

  const pastEvents = new Array(100000).fill({
    target: "+",
    type: "click",
  }) as any

  sha256Worker.onmessage = m => console.log(m.data)

  sha256Worker.postMessage({ id: 1, data: pastEvents })

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
  sha256Worker.postMessage({ id: 2, counter })

  setTimeout(() => sha256Worker.postMessage({ hash: "7" }), 1000)

  // sha256Worker.port.postMessage({ hash: "7" })
  // const Counter = function Counter(props: { pastEvents: any }) {
  //   const actions = {
  //     decrease: (state: any) => ({ counter: state.counter - 1 }),
  //     double: (state: { counter: number }) => ({ counter: state.counter * 2 }),
  //     increase: (state: { counter: number }) => ({
  //       counter: state.counter + 1,
  //     }),
  //   }
  //   const pastEvents = props.pastEvents || []

  //   const [events, setEvents] = React.useState(pastEvents)

  //   const state = events
  //     .map((ev: { target: any }) => {
  //       const text = ev.target
  //       if (text.includes("-")) return "decrease"
  //       else if (text.includes("+")) return "increase"
  //       else if (text.includes("x2")) return "double"
  //       return null
  //     })
  //     .reduce((state: any, ev: string | number) => actions[ev](state), {
  //       counter: 0,
  //     })

  //   const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
  //     setEvents([...events, { type: "click", target: String(e.target) }])

  //   return (
  //     <div>
  //       <button onClick={e => onClick(e)}>-</button>
  //       <button onClick={e => onClick(e)}>x2</button>
  //       Counter:<span>{state.counter}</span>
  //       <button onClick={e => onClick(e)}>+</button>
  //     </div>
  //   )
  // }

  worker.postMessage({
    code: counter,
    pastEvents,
  })

  let el = document.createElement("div")

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

      el.innerHTML = d.data.domString
      document.getElementById("zoli")?.append(el)
      // document.body.appendChild(el)
      // if (reactEl) hydrate()
    }
    if (d.data.code) {
      ret.compiledCode = d.data.code
      // const { code } = d.data

      // const React = (await import("react")).default
      // const ReactDOM = (await import("react-dom")).default
      // const cc = new Function(
      //   "props",
      //   "_React",
      //   `const React = _React; return (${code})(props)`
      // )

      // const cc = new Function("props", "React", `return (${code})(props)`)

      // const Counter = (props: any) => cc(props, React)

      // const ReactDOM = (await import("/react-dom.development.js")).default;

      // ReactDOM.hydrate(<Counter pastEvents={pastEvents} />, el)
    }
  }

  return () => ({ ...ret })
}

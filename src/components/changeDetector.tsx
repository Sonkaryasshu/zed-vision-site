import * as React from "react"

import Graph from "react-graph-vis"

// import "./styles.css"
// // need to import the vis network css in order to show tooltip
// import "./network.css"

function App() {
  const getSvg = (div: string) =>
    '<svg xmlns="http://www.w3.org/2000/svg">' +
    // '<rect x="0" y="0" width="100%" height="100%" fill="#7890A7" stroke-width="20" stroke="#ffffff" ></rect>' +
    '<foreignObject x="0" y="0" width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:42px">' +
    div +
    "</div>" +
    "</foreignObject>" +
    "</svg>"

  const getUrl = (nb: string) =>
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      getSvg("<div><button>+</button>" + nb + "<button>-</button></div>")
    )

  const graph = {
    nodes: [
      { id: 1, image: getUrl("1"), shape: "image" },
      { id: 2, image: getUrl("2"), shape: "image" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ],
    edges: [
      { from: 1, to: 2, label: "inc" },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  }

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
  }

  const events = {
    select: function (event: any) {
      var { nodes, edges } = event
      console.log("Selected nodes:")
      console.log(nodes)
      console.log("Selected edges:")
      console.log(edges)
    },
  }
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      style={{ height: "640px" }}
    />
  )
}

export const ChangeDetector: React.FC<{
  Comp1: React.FC<{ onEvent: (s: string) => void }>
}> = ({ Comp1 }) => {
  const [comps, setError] = React.useState([
    document.getElementById("id1")?.innerHTML || "<div></div>",
  ])

  const [lastEvent, setLastEvent] = React.useState("init")

  const check = (
    comps: string[],
    ev: string,
    setErr: (d: string[]) => void
  ) => {
    console.log("check")
    const str = document.getElementById("id1")?.innerHTML || "<div></div>"
    let newFn = [...comps, str]

    const old = [...comps]
    newFn.push(str)

    const num1 = Array.from(new Set(old))
    const num2 = Array.from(new Set(newFn))

    // newTom
    if (num1.length < num2.length) {
      console.log(num1)
      console.log(num2)
      console.log("render", num1, num2)
      console.log(lastEvent)
      setLastEvent(ev)
      setErr(num2)
      console.log(num2)
      //setTimeout(() => check(num2, (d: string[]) => setError(d)), 100)
    } else {
      /// setTimeout(() => check(num2, (d: string[]) => setError(d)), 100)
    }
  }

  // React.useEffect(() => {
  //   // console.log("useEffect")

  //   console.log("IN USE EFFECT AGAIN")
  //   // check(comps, (s: string[]) => setError(s))
  // }, [])

  const rest = (
    <div>
      {comps.length &&
        comps.map(d => (
          <div
            style={{ margin: 5, display: "inline-block" }}
            key={d}
            dangerouslySetInnerHTML={createMarkup(d || "uo")}
          />
        ))}
    </div>
  )

  return (
    <>
      <div style={{ margin: "10px", padding: "10px" }}>
        <div id="id1">
          <Comp1
            onEvent={ev => check(comps, ev, (d: string[]) => setError(d))}
          />
        </div>
        <App />
      </div>
      {rest}
    </>
  )
}

function createMarkup(markup: string) {
  return { __html: markup }
}

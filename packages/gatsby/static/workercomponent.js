importScripts(
  "https://unpkg.com/@ampproject/worker-dom@0.26.0/dist/worker/worker.js"
)
importScripts("https://unpkg.com/react@16/umd/react.development.js")
importScripts("https://unpkg.com/react-dom@16/umd/react-dom.development.js")

const webRunner = {
  el: null,
  document: null,
  onHeaderClick: null,
}

//   this.document = WorkerThread.workerDOM.document
// let window, document, el
const firstRun = name => {
  const window = (this.window = WorkerThread.workerDOM)

  const document = WorkerThread.workerDOM.document
  //   const React = window.React
  //   const window = this.window

  //   Object.assign(window, { HTMLIFrameElement: "yo" })

  const el = document.createElement("div")

  //   el.innerHTML = "yoooooo"

  ReactDOM.render(React.createElement(HelloName, { name: name }), el)

  WorkerThread.workerDOM.document.body.appendChild(el)
  console.log(document.body)
  webRunner.el = el
  webRunner.document = document
}

self.onmessage = d => {
  if (!webRunner.el) firstRun(d.data)
  else {
    webRunner.onHeaderClick()
  }
  postMessage(webRunner.el.innerHTML)
  console.log(webRunner.el.innerHTML)
  console.log(webRunner.onHeaderClick)
}

// https://babeljs.io/en/repl
// function HelloName({name}){
//   const [{counter}, setCounter] = React.useState({counter: 0});

//   return <h1 id="header" onClick={()=>setCounter({counter: counter+1})}>hello {counter} {name}</h1>
// }

function HelloName({ name }) {
  const [{ counter }, setCounter] = React.useState({
    counter: 0,
  })
  webRunner.onHeaderClick = () => {
    console.log("onClick")
    setCounter({
      counter: counter + 1,
    })
  }
  return /*#__PURE__*/ React.createElement(
    "h1",
    {
      id: "header",
      onClick: webRunner.onHeaderClick,
    },
    "hello ",
    counter,
    " ",
    name
  )
}

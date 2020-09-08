addEventListener("load", () => {
  const worker = new Worker("workercomponent.js")

  const pastEvents = new Array(100000).fill({ target: "+", type: "click" })

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

  let el = null
  let reactEl = null

  const hydrate = () => {
    ReactDOM.hydrate(reactEl, el)

    connectToServers()
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
      const Counter = new Function("props", `return (${code})(props)`)

      reactEl = React.createElement(Counter, { pastEvents: pastEvents })
      if (el) hydrate()
    }
  }

  function connectToServers() {
    const client = new WebTorrent()

    const magnet = `magnet:?xt=urn:btih:a8968c09427f398894df021249e4f3547586aa8d&dn=VID_20190826_040221.mp4&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.opentrackr.org:1337&tr=udp://explodie.org:6969&tr=udp://tracker.empire-js.us:1337&tr=wss://tracker.btorrent.xyz&tr=wss://tracker.openwebtorrent.com`

    client.add(magnet, function (torrent) {
      // Torrents can contain many files. Let's use the .mp4 file
      const file = torrent.files.find(function (file) {
        return file.name.endsWith(".mp4")
      })

      // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
      file.appendTo("body")

      const video = document.querySelector("video")
      const videoStream = new VideoStream(file, video)

      video.addEventListener("error", () => {
        // listen for errors on the video/audio element directly
        const errorCode = elem.error
        const detailedError = videoStream.detailedError
      })
    })
  }
})

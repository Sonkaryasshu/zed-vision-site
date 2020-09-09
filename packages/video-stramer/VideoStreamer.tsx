import * as React from "react"

export const Streamer: React.FC<{ magnetURL: string }> = ({ magnetURL }) => {
  const [state, changeState] = React.useState({ loading: true, videoFiles: [] })

  React.useEffect(() => {
    const connect = async (magnetURL: string) => {
      // const VideoStream = (await import("videostream")).default
      let WebTorrent

      const wtMin = (await import("@devcontainer/webtorrent/webtorrent.min"))
        .default

      if (wtMin.Default && wtMin.Default.name === "WebTorrent")
        WebTorrent = wtMin.default
      else {
        const wtDebug = await import(
          "@devcontainer/webtorrent/webtorrent.debug"
        )

        WebTorrent = wtDebug.default
      }

      const client = new WebTorrent()

      client.add(magnetURL, async function (torrent: any) {
        console.log(torrent.files)
        const videoFiles = torrent.files.filter((file: any) =>
          file.name.endsWith("mp4")
        )

        changeState({ loading: false, videoFiles: videoFiles })

        // torrent.files.find(function (file: any) {
        //   if (file.name.endsWith(".mp4")) {
        //     if (file.createReadStream) {
        //       try {
        //         // const ref = React.useRef()
        //         //@ts-ignore
        //         // const videoElement = <video controls ref={ref} />
        //         // addVideo([...videos, videoElement])
        //         // const videostream = new VideoStream(file, ref.current)
        //         // videostream.addEventListener("error", () => {
        //         //   const errorCode = videostream.error
        //         //   const detailedError = videostream.detailedError
        //         //   console.log(errorCode, detailedError)
        //         //   file.appendTo("body")
        //         // })
        //       } catch (e) {
        //         console.log(e)
        //       }
        //     } else {
        //       file.appendTo()
        //     }
        //   }
        // })
      })
    }
    connect(magnetURL)
  }, [])

  if (state.loading) {
    return <h1>loading</h1>
  }

  return (
    <div>
      {state.videoFiles.map((file: any, key) => (
        <div key={key}>{file.name}</div>
      ))}
    </div>
  )
}

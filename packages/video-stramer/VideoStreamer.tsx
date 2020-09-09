import * as React from "react"

export const Streamer: React.FC<{ magnetURL: string }> = ({ magnetURL }) => {
  const [videos, addVideo] = React.useState<JSX.Element[]>([])
  const connect = async (magnetURL: string) => {
    const VideoStream = await import("videostream")
    const wtMin = (await import("@devcontainer/webtorrent/webtorrent.min"))
      .default

    let WebTorrent

    if (wtMin.Default && wtMin.Default.name === "WebTorrent")
      WebTorrent = wtMin.default
    else {
      const wtDebug = await import("@devcontainer/webtorrent/webtorrent.debug")

      WebTorrent = wtDebug.default
    }

    const client = new WebTorrent()

    client.add(magnetURL, async function (torrent: any) {
      console.log(torrent.files)
      torrent.files.find(function (file: any) {
        if (file.name.endsWith(".mp4")) {
          if (file.createReadStream) {
            try {
              const ref = React.useRef()
              //@ts-ignore
              const videoElement = <video controls ref={ref} />

              addVideo([...videos, videoElement])
              const videostream = new VideoStream(file, ref.current)

              videostream.addEventListener("error", () => {
                const errorCode = videostream.error
                const detailedError = videostream.detailedError
                console.log(errorCode, detailedError)
                file.appendTo("body")
              })
            } catch (e) {
              console.log(e)
            }
          } else {
            file.appendTo()
          }
        }
      })
    })
  }

  React.useEffect(() => {
    connect(magnetURL)
  }, [])

  if (videos.length === 0) {
    return <h1>Nothing</h1>
  }

  return <div>{videos.map(v => v)}</div>
}

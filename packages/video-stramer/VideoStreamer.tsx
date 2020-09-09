import * as React from "react"
import VideoStream from "videostream"
import WebTorrent from "@devcontainer/webtorrent/webtorrent.min"

const connect = async (magnetURL: string, videoRef: any) => {
  const client = new WebTorrent()

  client.add(magnetURL, async function (torrent: any) {
    console.log(torrent.files)
    torrent.files.find(function (file: any) {
      if (file.name.endsWith(".mp4")) {
        if (file.createReadStream) {
          try {
            const video = videoRef.current
            const videostream = new VideoStream(file, video)

            video.addEventListener("error", () => {
              const errorCode = videostream.error
              const detailedError = videostream.detailedError
              console.log(errorCode, detailedError)
              file.appendTo("body")
            })
          } catch (e) {
            console.log(e)
          }
        }
      }
    })
  })
}

export const Streamer: React.FC<{ magnetURL: string }> = ({ magnetURL }) => {
  const video = React.useRef(null)

  React.useEffect(() => {
    connect(magnetURL, video)
  }, [])
  return <video controls ref={video} />
}

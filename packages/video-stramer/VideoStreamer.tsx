import * as React from "react"
import VideoStream from "videostream"

import styled from "styled-components"

const Video: React.FC<{ file: any }> = ({ file }) => {
  const videoRef = React.useRef(null)
  React.useEffect(() => {
    new VideoStream(file, videoRef.current)
  })
  return (
    <>
      <h4>{file.name}</h4>
      <video controls ref={videoRef}></video>
    </>
  )
}

const StyledTextArea = styled.textarea`
  display: block;
  width: 100%;
`
export const Streamer: React.FC<{ magnetURL: string }> = ({ magnetURL }) => {
  const [state, changeState] = React.useState({
    loading: true,
    videoFiles: [],
    magnetURL: magnetURL,
  })

  React.useEffect(() => {
    const connect = async (magnetURL: string) => {
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

        changeState({ ...state, loading: false, videoFiles: videoFiles })
      })
    }
    connect(magnetURL)
  }, [])

  if (state.loading) {
    return (
      <>
        <h2>loading</h2>
        <StyledTextArea
          value={magnetURL}
          onChange={e => changeState({ ...state, magnetURL: e.target.value })}
        ></StyledTextArea>
      </>
    )
  }

  return (
    <div>
      {state.videoFiles.map((file: any, key) => (
        <Video file={file} key={key} />
      ))}
    </div>
  )
}

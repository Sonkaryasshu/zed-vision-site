import * as React from "react"
const VideoStream = require("videostream")
import "webtorrent/webtorrent.debug.js"


const connect = async (magnetURL: string, videoRef: any) => {
  // @ts-ignore
  const client = new WebTorrent()

  client.add(
    magnetURL,
    async function (torrent: any) {
      console.log(torrent.files);
      torrent.files.find(function (file: any) {
         if (file.name.endsWith(".mp4")) {
          if (file.createReadStream) {

            try{
              const video = videoRef.current;
              const videostream = new VideoStream(file, video)
      
              video.addEventListener("error", () => {
                const errorCode = videostream.error
                const detailedError = videostream.detailedError
                console.log(errorCode, detailedError)
                file.appendTo("body")
              })
            }
            catch (e){
              console.log(e)
            }
      
          }
         }
      })



      // torrent.on('download', function (bytes: any) {
      //   console.log('just downloaded: ' + bytes)
      //   console.log('total downloaded: ' + torrent.downloaded)
      //   console.log('download speed: ' + torrent.downloadSpeed)
      //   console.log('progress: ' + torrent.progress)
      // })


      // console.log(file.progress)
 
    })}

export const Streamer: React.FC<{ magnetURL: string }> = ({ magnetURL }) =>{
  
  const video = React.useRef(null);
  
  React.useEffect(() => {

   setTimeout( ()=>connect(magnetURL, video), 100)
   ,
[]});

    return <><h1>Loading</h1>
    <video controls ref={video}></video></>
  }

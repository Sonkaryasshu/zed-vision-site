import * as React from "react"
import ReactDOM from "react-dom"
const VideoStream = require("videostream")
const WebTorrent = require("webtorrent/webtorrent.min.js")


const connect = async (magnetURL: string, videoRef: obj) => {
  // const WebTorrent = await require("webtorrent/webtorrent.min.js")
  const client = new WebTorrent()

  client.add(
    magnetURL,
    async function (torrent: any) {
      // Torrents can contain many fisiles. Let's use the .mp4 file
      console.log(torrent.files);
      const file = torrent.files.find(function (file: any) {
         if (file.name.endsWith(".mp4")) {
          if (file.createReadStream) {

            try{
      
           
              const video = videoRef.current;
              const videostream = new VideoStream(file, video)
      
              video.addEventListener("error", () => {
                // listen for errors on the video/audio element directly
                const errorCode = videostream.error
                const detailedError = videostream.detailedError
                console.log(errorCode, detailedError)
                // videostream.detailedError will often have a more detailed error message
                // Display the file by adding it to the DOM.
                // Supports video, audio, image files, and more!
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

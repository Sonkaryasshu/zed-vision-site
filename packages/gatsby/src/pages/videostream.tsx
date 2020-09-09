import Layout from "../components/layout"
import React from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import {Streamer} from "@zed-vision/video-streamer"
import styled from "styled-components"

const StyledStreamer = styled(Streamer)`
video{
  display: block;
  width: 100%;
}
`

const StyledTextArea = styled.textarea`
    display: block;
    width: 100%
`

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
  location: Location
}

const VideoStreamingPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title


  const magnet = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'


  const [magnetURL, changeMagnet] = React.useState(magnet)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />

      <StyledStreamer magnetURL={magnetURL} />

      <StyledTextArea value={magnetURL} onChange={(e: any)=>changeMagnet(e.target.value)}></StyledTextArea>

    </Layout>
  )
}

export default VideoStreamingPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

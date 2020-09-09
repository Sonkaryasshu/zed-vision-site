import Layout from "../components/layout"
import React from "react"
import SEO from "../components/seo"
import { ChangeDetector } from "../components/changeDetector"
import { graphql } from "gatsby"
import {Streamer} from "@zed-vision/video-streamer";

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

const Comp1: React.FC<{ onEvent: (event: string) => void }> = ({ onEvent }) => {
  const [count, setCount] = React.useState(0)
  return (
    <>
      <button
        onClick={() => {
          onEvent("inc")
          setCount(count + 1)
        }}
      >
        +
      </button>
      {count}
      <button
        onClick={() => {
          onEvent("dec")
          setCount(count - 1)
        }}
      >
        -
      </button>
    </>
  )
}

const NotFoundPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  const magnet = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <Streamer magnetURL={magnet} ></Streamer>

      <h1>Not Found!!!!</h1>
      <ChangeDetector Comp1={Comp1}></ChangeDetector>
      <p>You just hit a route that doesn't exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

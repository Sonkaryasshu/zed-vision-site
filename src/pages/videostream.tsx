import React from "react";
import { SEO } from "../components/seo";
import { graphql } from "gatsby";
import { Streamer } from "../components/videoStreamer/VideoStreamer";

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  location: Location;
}

const VideoStreamingPage = ({ data, location }: Props) => {
  const magnet =
    "magnet:?xt=urn:btih:cf405c3f4683631e43a20056933dc565da3cc2b9&dn=VID_20190802_145240.mp4&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com";

  return (
    <React.Fragment>
      <SEO title="Stream something from here :)" />
      <Streamer magnetURL={magnet} />
    </React.Fragment>
  );
};

export default VideoStreamingPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

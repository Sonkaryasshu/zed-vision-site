import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import GatsbyImage from "gatsby-image"

import { rhythm } from "../utils/typography"

const Container = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2.5)};
`

const StyledImage = styled(GatsbyImage)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 50;
  border-radius: "100%";
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/zed-profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <Container>
      <StyledImage
        alt={author.name}
        //@ts-ignore
        fixed={data.avatar.childImageSharp.fixed}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by <strong>{author.name}</strong> {author.summary}
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          You should follow him on Twitter
        </a>
      </p>
    </Container>
  )
}

export default Bio

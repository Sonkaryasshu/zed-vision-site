import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import GatsbyImage, { GatsbyImageFixedProps } from "gatsby-image";

import { rhythm } from "./utils/typography";

const Container = styled.div`
display: flex;
margin-bottom: ${rhythm(2.5)};
`;

const StyledImgDiv = styled.div`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  overflow: hidden;
  min-width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Bio = () => {
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
  `) as {
    site: any;
    avatar: {
      childImageSharp: GatsbyImageFixedProps;
    };
  };

  const { author, social } = data.site.siteMetadata;

  return (
    <Container>
      <StyledImgDiv>
        <GatsbyImage
          alt={author.name}
          fixed={data.avatar.childImageSharp.fixed}
        />
      </StyledImgDiv>
      <p>
        Written by <strong>{author.name}</strong>
        {author.summary}
        <br />
        <a href={`https://twitter.com/${social.twitter}`}>
          Follow me on Twitter
        </a>
      </p>
    </Container>
  );
};

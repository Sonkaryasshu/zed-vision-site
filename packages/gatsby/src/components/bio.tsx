import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import GatsbyImage from "gatsby-image";

import { rhythm } from "../utils/typography";

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
  `);

  const { author, social } = data.site.siteMetadata;

  const Container = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2.5)};
`;

  const StyledImage = styled(GatsbyImage)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
`;

  return (
    <Container>
      <StyledImage
        alt={author.name}
        fixed={data.avatar.childImageSharp.fixed}
      />
      <p>
        Written by <strong>{author.name}</strong>
        {author.summary}<br/ >
        <a href={`https://twitter.com/${social.twitter}`}>
          Follow me on Twitter
        </a>
      </p>
    </Container>
  );
};

export default Bio;

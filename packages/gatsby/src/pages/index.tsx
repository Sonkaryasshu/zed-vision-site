import * as React from "react";
import { Link, graphql } from "gatsby";

import { Bio } from "../components/bio";
import Layout from "../components/layout";
import { SEO } from "../components/seo";
import { rhythm } from "../components/utils/typography";
import styled from "styled-components";

const StyledLink = styled(Link)`
  box-shadow: "none";
`;

const H3 = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`;

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allMdx: {
      edges: {
        node: {
          excerpt: string;
          frontmatter: {
            title: string;
            date: string;
            description: string;
          };
          fields: {
            slug: string;
          };
        };
      }[];
    };
  };
  location: Location;
}

const BlogIndex: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const edges = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="This is Zed vision" />
      <Bio />
      {edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <header>
              <H3>
                <StyledLink to={node.fields.slug}>{title}</StyledLink>
              </H3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;

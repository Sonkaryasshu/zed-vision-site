import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Hello = () => (
  <>
    {" "}
    <h1>Hello</h1>
    <p>Just wanted to say Hello!</p>
    <AmplifySignOut />
  </>
)

const AuthHello = withAuthenticator(Hello)

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

const HelloPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Oh hello!!!" />
      <AuthHello />
    </Layout>
  )
}

export default HelloPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

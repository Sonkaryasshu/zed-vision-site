import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../aws-exports';
Amplify.configure(awsConfig);


const HelloPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Oh hello!" />
      <h1>Hello</h1>
      <p>Just wanted to say Hello!</p>
      <AmplifySignOut />
    </Layout>
  )
}

export default withAuthenticator(HelloPage, {})

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

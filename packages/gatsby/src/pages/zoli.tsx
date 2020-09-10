import Layout from "../components/layout"
import React from "react"
import SEO from "../components/seo"
import { ChangeDetector } from "../components/changeDetector"
import { graphql } from "gatsby"
import { register } from "../utils/testWorker"

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

// var Wrapper = ({ html }) => {
//   const html2 = ``.toUpperCase()
//   // `return` <div dangerouslySetInnerHTML={createMarkup()} />

//   function createMarkup() {
//     return { __html: html2 }
//   }
// }

const Comp1: React.FC<{ onEvent: (event: string) => void }> = ({ onEvent }) => {
  const [count, setCount] = React.useState(0)

  // let el = register()

  // const [{ html }, setWK] = React.useState({ html: el().innerHTML })
  // React.useEffect(() => {
  //   // if (html !== el().innerHTML) setWK({ html: "dddd<div>ello elllo</div>ee" })
  // }, [])

  return (
    <>
      {/* aaa */}
      {/* <Wrapper html={html}></Wrapper> */}
      {/* bbb */}

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

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />

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

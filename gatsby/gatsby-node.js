const path = require(`path`)
const fs = require("fs").promises
const glob = require("glob")
const md5 = require("md5")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onPostBuild = async () => {
  const publicPath = path.join(__dirname, "public")
  const hash = md5("replace-with-your-own-hash")

  const jsonFiles = glob.sync(`${publicPath}/page-data/**/page-data.json`)
  console.log("[onPostBuild] Renaming the following files:")
  for (let file of jsonFiles) {
    console.log(file)
    const newFilename = file.replace(`page-data.json`, `page-data.${hash}.json`)
    await fs.rename(file, newFilename)
  }

  const htmlAndJSFiles = glob.sync(`${publicPath}/**/*.{html,js}`)
  console.log(
    "[onPostBuild] Replacing page-data.json references in the following files:"
  )
  for (let file of htmlAndJSFiles) {
    const stats = await fs.stat(file, "utf8")
    if (!stats.isFile()) continue
    console.log(file)
    var content = await fs.readFile(file, "utf8")
    var result = content.replace(/page-data.json/g, `page-data.${hash}.json`)
    await fs.writeFile(file, result, "utf8")
  }
}

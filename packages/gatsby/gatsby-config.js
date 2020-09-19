module.exports = {
  siteMetadata: {
    title: `Zed vision`,
    author: {
      name: `Zoltan Erdos`,
      summary: ` - developer experience and software quality expert`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://www.zed.vision/`,
    social: {
      twitter: `ZoltanErdos`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,

      options: {
        icon: `assets/gatsby-icon.png`,
        name:
          `Zed Vision - Development experience, Testing, and everything between`,
        short_name: `ZedVision`,
        description: "Blog and tech experiments",
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        cache_busting_mode: "none",
      },
    },
    `gatsby-plugin-styled-components`,
    "gatsby-plugin-remove-generator"
  ],
};

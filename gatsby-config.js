const path = require('path')

module.exports = {
  siteMetadata: {
    title: `I'm Roman and here are some squares. Hover or tab on em.`,
    description: `some stuff I put on web.`,
    author: `@romanfromrome`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        components: path.join(__dirname, 'src/components'),
        style: path.join(__dirname, 'src/style'),
        images: path.join(__dirname, 'src/images'),
        pages: path.join(__dirname, 'src/pages'),
        statics: path.join(__dirname, 'src/statics')
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

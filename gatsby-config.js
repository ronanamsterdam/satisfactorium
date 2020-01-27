const path = require('path')

const GEN_BUNDLE_ANALYTICS = process.env.GEN_BUNDLE_ANALYTICS;

let config = {

  siteMetadata: {
    title: `your satisfactorium`,
    description: `some stuff I put on web.`,
    author: `@wallofballs`,
    nav:[
        {
          text:'experiments',
          href:'/experiments'
        },
        // {
        //   text:'blog',
        //   href:'/blog'
        // },
        // {
        //   text:'projects',
        //   href:'/projects'
        // },
        {
          text:'about',
          href:'/about'
        }
      ]
  },
  plugins: [
    'gatsby-plugin-root-import',
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
        statics: path.join(__dirname, 'src/statics'),
        apps: path.join(__dirname, 'src/apps'),
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
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: "UA-145596695-2",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        // respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "satisfactorium.com",
      },
    },
    'gatsby-plugin-typescript',
  ],
}

if (GEN_BUNDLE_ANALYTICS) {
  config = {
    ...config,
    plugins: [
      ...config.plugins,
      {
        resolve: 'gatsby-plugin-webpack-bundle-analyzer',
        options: {
          openAnalyzer: true,
          analyzerPort: 3000,
          production: true,
        },
      }
    ]
  }
}

module.exports = config
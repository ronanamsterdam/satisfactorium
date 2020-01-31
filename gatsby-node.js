/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
const webpack = require('webpack');

const ENV = process.env.NODE_ENV || 'development';

exports.onCreateWebpackConfig = ({ plugins, actions, stage }) => {
  let config = {
    node: {
      __dirname: true,
    },
    plugins: [
      plugins.normalModuleReplacement(/(.*)-ENV_TARGET(\.*)/, function(resource) {
        resource.request = resource.request.replace(/-ENV_TARGET/, `-${ENV}`);
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /(twitterGifExporter|exp-charts)(?!\/src)\/.+/,
      })
    ]
  }

  if (ENV === 'production') {
    config = {
      ...config,
      devtool: false,
    }
  }

  actions.setWebpackConfig(config)
}
// next.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withSvgr = require('next-plugin-svgr')

module.exports = withSvgr({
  webpack(config, options) {
    return config
  },
})
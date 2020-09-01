// next.config.js

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config()
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withSvgr = require('next-plugin-svgr')

module.exports = withSvgr({
  webpack(config, options) {
    return config
  },
  env: {
    PEER_HOST: process.env.PEER_HOST,
    PEER_PORT: process.env.PEER_PORT,
    PORT: process.env.PORT
  }
})
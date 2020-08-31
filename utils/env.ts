export const __port__ = parseInt(process.env.PORT || '3000', 10)
export const __prod__ = process.env.NODE_ENV === 'production'
export const __peer__ = process.env.PEER_JS_ENDPOINT || 'peerjs'

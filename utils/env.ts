export const __prod__ = process.env.NODE_ENV === 'production'
export const __app_port__ = parseInt(process.env.PORT || '3000', 10)

export const __peer_host__ = process.env.PEER_HOST || '/' // heroku app server
export const __peer_port__ = process.env.PEER_PORT || '3001' // 9000 or 443 for https
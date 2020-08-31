import express, { Request, Response } from 'express'
import nextJS from 'next'
import http from 'http'
import socketIO from 'socket.io'
import { ExpressPeerServer } from 'peer'
import { v4 as uuid } from 'uuid'
import {__peer__, __port__, __prod__} from '../utils/env'

(async ()=> {
  const next = nextJS({ dev: !__prod__ })
  const handle = next.getRequestHandler()
  await next.prepare()
  const app = express()
  const server = http.createServer(app)
  app.use( __peer__, ExpressPeerServer(server))
  const io = socketIO(server)

  // SOCKET COMMUNICATION
  io.on('connection', socket => {
    socket.on('join-room', ({ roomId, userId })=>{
      socket.join(roomId)

      socket.to(roomId).broadcast.emit('user-connected', userId)

      socket.on('disconnect', () => {
        socket.to(roomId).broadcast.emit('user-disconnected', userId)
      })
    })
  })

  // API REQUESTS
  app.get('/api/getRoomId', (_, res: Response) => {
    return res.status(200).send({roomId: uuid()})
  })

  // RENDERER
  app.get('/', (req: Request, res: Response) => {
    return next.render(req, res, '/home')
  })

  app.get('/:roomId', (req: Request, res: Response) => {
    return next.render(req, res, '/room',  { roomId: req.params.roomId })
  })

  app.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  server.listen(__port__, () => {
    console.log(`> Ready on http://localhost:${__port__}`)
  })
})()


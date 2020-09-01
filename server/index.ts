import express, { Request, Response } from 'express'
import nextJS from 'next'
import http from 'http'
import socketIO from 'socket.io'
import { v4 as uuid } from 'uuid'
import {Event} from '../utils/enums'
import { __peer_port__, __app_port__, __prod__} from '../utils/env'

(async ()=> {
  const next = nextJS({ dev: !__prod__ })
  const handle = next.getRequestHandler()
  await next.prepare()
  const app = express()
  const server = http.createServer(app)

  if(!__prod__){ // IF NOT IN PROD RUN PEER LOCAL SERVER
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const PeerServer = require('peer').PeerServer
    PeerServer({ port: __peer_port__, path: '/' })
  }

  const io = socketIO(server)

  // SOCKET COMMUNICATION
  io.on(Event.Connection, socket => {
    socket.on(Event.JoinRoom, ({ roomId, userId })=>{
      socket.join(roomId)

      socket.to(roomId).broadcast.emit(Event.UserConnected, userId)

      socket.on(Event.Disconnect, () => {
        socket.to(roomId).broadcast.emit(Event.UserDisconnected, userId)
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

  server.listen(__app_port__, () => {
    console.log(`> Ready on http://localhost:${__app_port__}`)
  })
})()


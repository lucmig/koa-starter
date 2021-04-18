import http from 'http'
import https from 'https'
import http2 from 'http2'
import fs from 'fs'
import path from 'path'
import pino from 'pino'
import Koa from 'koa'

import * as koaConfig from './koa'

let httpServer
let httpsServer
let http2Server

const logger = pino()

export const start = async params => {
  const cert = {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.cert'))
  }
  const app = new Koa()
  httpServer = http.createServer(app.callback()).listen(params.httpPort || 9000)
  httpsServer = https.createServer(cert, app.callback()).listen(params.httpsPort || 9001)
  http2Server = http2.createSecureServer(cert, app.callback()).listen(params.http2Port || 9002)
  logger.info(`listening on http port ${params.httpPort}`)
  logger.info(`listening on https port ${params.httpsPort}`)
  logger.info(`listening on http2 port ${params.http2Port}`)
  logger.info(`deployment environment is ${process.env.NODE_ENV}`)

  koaConfig.configure(app)
}

export const stop = async () => {
  if (httpServer) httpServer.close()
  if (httpsServer) httpsServer.close()
  if (http2Server) http2Server.close()
  logger.info('stopped')
}

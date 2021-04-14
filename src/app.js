import http from 'http'
import https from 'https'
import http2 from 'http2'
import pino from 'pino'
import Koa from 'koa'

import * as koaConfig from './koa'

let httpServer
let httpsServer
let http2Server

const logger = pino()

export const start = async options => {
  const app = new Koa()
  httpServer = http.createServer(app.callback()).listen(options.httpPort || 9000)
  httpsServer = https.createServer(app.callback()).listen(options.httpsPort || 9001)
  http2Server = http2.createServer(app.callback()).listen(options.http2Port || 9002)
  logger.info(`listening on http port ${options.httpPort}`)
  logger.info(`listening on https port ${options.httpsPort}`)
  logger.info(`listening on http2 port ${options.http2Port}`)
  logger.info(`deployment environment is ${process.env.NODE_ENV || 'dev'}`)

  koaConfig.configure(app)
}

export const stop = async () => {
  if (httpServer) httpServer.close()
  if (httpsServer) httpsServer.close()
  if (http2Server) http2Server.close()
  logger.info('stopped')
}

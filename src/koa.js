import path from 'path'
import bodyParser from 'koa-bodyparser'
import favicon from 'koa-favicon'

import router from './router'

export const configure = app => {
  app.use(bodyParser())

  app.use(favicon(path.join(__dirname, 'favicon.ico')))

  app.use(router().routes())
}


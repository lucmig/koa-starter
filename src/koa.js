import bodyParser from 'koa-bodyparser'

import router from './router'

export const configure = app => {
  app.use(bodyParser())

  app.use(router().routes())
}


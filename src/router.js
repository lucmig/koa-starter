import Router from 'koa-router'

export default () => {
  const router = new Router()

  router.get('/', async ctx => {
    ctx.body = 'hello world'
  })

  return router
}
import promClient from 'prom-client'
import Router from 'koa-router'

export default () => {
  const allCount = new promClient.Counter({
    name: 'ks_total_call_count',
    help: 'call count'
  })
  promClient.collectDefaultMetrics({
    labels: { NODE_APP_INSTANCE: process.env.NODE_APP_INSTANCE },
  })

  const router = new Router()

  router.get('/metrics', async ctx => {
    ctx.set('Content-Type', promClient.register.contentType)
    ctx.body = await promClient.register.metrics()
  })

  router.get('/', async ctx => {
    allCount.inc()
    ctx.body = 'hello world'
  })

  return router
}
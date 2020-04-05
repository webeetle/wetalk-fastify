const fastify = require('fastify')({ logger: true})

fastify.register(require('./our-first-route'))

const startServer = async port => {
  try {
    await fastify.listen(port)
    fastify.log.info(`Server started on http://localhost:${port}`)
  } catch (e) {
    fastify.log.error(e)
    process.exit(1)
  }
}

startServer(3000)

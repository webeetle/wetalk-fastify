'use strict'

const Fastify = require('fastify')
const fastify = new Fastify({ 
  logger: {
    level: 'info'
  } 
})

// Declare a route for our application
fastify.get('/', async (req, res) => {
  return { hello: 'world' }
})

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

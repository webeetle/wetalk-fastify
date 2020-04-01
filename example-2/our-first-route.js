async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    return fastify.utility()
  })
}

module.exports = routes

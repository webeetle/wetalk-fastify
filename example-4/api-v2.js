async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world! Again!' }
  })
}

module.exports = routes

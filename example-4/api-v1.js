const S = require('fluent-schema')

async function routes (fastify, options) {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: S.object()
        .prop('name', S.string().required()),
      response: {
        200: S.object()
          .prop('message', S.string())  
      }
    },
    onRequest: async (request, reply) => {
      fastify.log.info("onRequest")
    },
    preValidation: async (request, reply) => {
      fastify.log.info("preValidation")
    },
    preHandler: async (request, reply) => {
      fastify.log.info("preHandler")
    },
    preSerialization: async (request, reply) => {
      fastify.log.info("preSerialization")
    },
    handler: async (request, reply) => {
      const { name } = request.body
      return { message: `Hello, ${name}` }
    }
  })
}

module.exports = routes
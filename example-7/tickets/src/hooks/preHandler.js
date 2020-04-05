'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
  fastify.addHook('preHandler', async (request, reply) => {
    return request.jwtVerify()
  })
})

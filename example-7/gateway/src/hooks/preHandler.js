'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
  fastify.addHook('preHandler', async (request, reply) => {
    const regex = new RegExp('\/api\/*')
    const url = request.raw.originalUrl
    
    if (regex.test(url))
      return request.jwtVerify()
  })
})

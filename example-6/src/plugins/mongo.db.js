'use strict'

const fp = require('fastify-plugin')
const MongoDB = require('fastify-mongodb')

module.exports = fp(async (fastify, opts) => {
  let mongoOpts = Object.assign({}, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/wetalk',
  }, opts.mongodb)

  if (process.env.MONGODB_USER) {
    mongoOpts = Object.assign(mongoOpts, {
      auth: {
        user: process.env.MONGODB_USER || '',
        password: process.env.MONGODB_PASSWORD || ''
      }
    })
  }

  fastify.register(MongoDB, mongoOpts)
})
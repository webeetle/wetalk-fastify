'use strict'

const S = require('fluent-schema')
const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.addSchema(S.object()
    .id('#message')
    .prop('message', S.string())
  )
})
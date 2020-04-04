'use strict'

const fp = require('fastify-plugin')
const S = require('fluent-schema')

module.exports = fp(async function (fastify, opts) {
  fastify.addSchema(S.object()
    .id('#ticket')
    .prop('_id', S.string())
    .prop('subject', S.string())
    .prop('body', S.string())
    .prop('username', S.string())
    .prop('creation-date', S.string().format('date-time'))
  )
})
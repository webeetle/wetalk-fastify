'use strict'

const fp = require('fastify-plugin')
const S = require('fluent-schema')
const { 
  messageSchema,
  ticketSchema
} = require('./../schema')

module.exports = fp(async function (fastify, opts) {
  fastify.addSchema(ticketSchema)
  fastify.addSchema(messageSchema)
})
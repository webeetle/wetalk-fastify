'use strict'

const fp = require('fastify-plugin')
const Swagger = require('fastify-swagger')
const {
  messageSchema,
  ticketSchema
} = require('../schema');

module.exports = fp(async (fastify, opts) => {
  const swaggerOpts = {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'weTalk Tickets System',
        description: 'A wonderful ticketing system',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'tickets', description: 'tickets specifications' },
        { name: 'auth', description: 'Authentication' }
      ],
      definitions: {
        ticket: ticketSchema,
        message: messageSchema
      }
    },
    exposeRoute: true
  }
  fastify.register(Swagger, swaggerOpts)
})
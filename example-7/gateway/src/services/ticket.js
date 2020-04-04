'use strict'

const isDocker = require('is-docker')
const proxy = require('fastify-http-proxy')

module.exports = async function (fastify, opts) {
  fastify.register(proxy, {
    upstream: `http://${isDocker() ? 'ticket-service' : 'localhost'}:3002`
  })
}

module.exports.autoPrefix = '/api/ticket'
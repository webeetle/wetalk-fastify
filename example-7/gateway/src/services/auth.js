'use strict'

const isDocker = require('is-docker')
const proxy = require('fastify-http-proxy')

module.exports = async function (fastify, opts) {
  fastify.register(proxy, {
    upstream: `http://${isDocker() ? 'auth-service' : 'localhost'}:3001`
  })
}
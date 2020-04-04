'use strict'

const fp = require('fastify-plugin')
const cors = require('fastify-cors')

module.exports = fp(async (fastify, opts) => {
  const corsOpts = Object.assign ({}, {
    origin: '*',
    methods: ['DELETE','GET','HEAD','PATCH','POST','PUT','OPTIONS']
  }, opts.cors)

  fastify.register(cors, corsOpts)
})
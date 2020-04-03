'use strict'

const securePassword = require('secure-password')
const S = require('fluent-schema')

const DUPLICATE_KEY_ERROR = 11000

module.exports = async function (fastify, opts) {
  const users = fastify.mongo.db.collection('users')
  const pwd = securePassword()

  users.createIndex({
    username: 1
  }, { unique: true })

  fastify.post('/signup', {
    schema: {
      tags: ['auth'],
      description: 'Create and login endopoints',
      body: S.object()
        .prop('username', S.string()
          .maxLength(10)
          .description("The preferred username")
          .required())
        .prop('password', S.string()
          .description("The password")
          .required())
        .prop('fullName', S.string()
          .maxLength(50)
          .description("The name of the user")
          .required()),
      response: {
        200: S.object()
          .prop('token', S.string()),
        400: S.ref('#message')
      }
    }
  }, async function (request, reply) {
    const { fullName, username, password } = request.body
    const hashedPassword = await pwd.hash(Buffer.from(password))

    try {
      await users.insertOne({
        'fullName': fullName,
        'username': username,
        'password': hashedPassword
      })
    } catch (err) {
      // duplicate key error
      if (err.code === DUPLICATE_KEY_ERROR) {
        return reply.code(400).send({ message: 'username already registered' })
      }
    }

    const token = await reply.jwtSign({ username })
    return { token: token }
  })

  fastify.post('/signin', {
    schema: {
      tags: ['auth'],
      description: 'Login endpoint',
      body: S.object()
        .prop('username', S.string()
          .description("The preferred username")
          .required())
        .prop('password', S.string()
          .description("The user password")
          .required()),
      response: {
        200: S.object()
          .prop('token', S.string()),
        404: S.ref('#message'),
        400: S.ref('#message')
      }
    }
  }, async function (request, reply) {
    const { username, password } = request.body
    const user = await users.findOne({ username: username })

    if (!user) {
      reply
        .code(404)
        .send({ message: 'username not found' })
      return
    }

    const res = await pwd.verify(Buffer.from(password), user.password.buffer)
    switch (res) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
        reply
          .code(400)
          .send({ message: 'This hash was not made with secure-password. Attempt legacy algorithm' })
        return
      case securePassword.INVALID:
        reply
          .code(400)
          .send({ message: 'Invalid password' })
        return
      case securePassword.VALID_NEEDS_REHASH:
        req.log.info({ username }, 'password needs rehashing')
        const hashedPassword = await pwd.hash(Buffer.from(password))
        await users.update({ _id: user._id }, { hashedPassword })
        break
    }

    const token = await reply.jwtSign({ username: username, fullName: user.fullName })
    return { token: token }
  })
}
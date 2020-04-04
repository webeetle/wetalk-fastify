'use strict'
const S = require('fluent-schema')

module.exports = async function(fastify, opts) {
  const ticketsCollection = fastify.mongo.db.collection('tickets')
  const { ObjectId } = fastify.mongo

  fastify.delete('/ticket/:id', {
    schema: {
      tags: ['tickets'],
      description: 'This method delete the ticket with specified id',
      params: S.object()
        .prop('id', S.string()
        .description("The ticket id to delete")
        .required()),
      response: {
        200: S.ref('#message'),
        404: S.ref('#message')
      }
    }
  }, async function (request, reply) {
    const { id } = request.params;
    const result = await ticketsCollection.deleteOne({
      _id: new ObjectId(id),
      username: request.user.username
    })

    if (result.deletedCount === 0) {
      reply.code(404)
      return { message: 'No ticket found' }
    }

    return { message: `Ticket ${id} deleted!` }
  })

  fastify.get('/tickets', {
    schema: {
      tags: ['tickets'],
      description: 'Get all the tickets of the database',
      response: {
        200: S.array().items(
          S.ref('#ticket')
        ),
        404: S.ref('#message')
      }
    }
  }, async function (request, reply) {
    const tickets = await ticketsCollection.find({
      username: request.user.username
    }).sort({
      _id: -1 // new tickets first
    }).toArray()

    return tickets
  })

  fastify.get('/ticket/:id', {
    schema: {
      tags: ['tickets'],
      description: 'Get the ticket info with specified id',
      params: S.object()
        .prop('id', S.string().required()),
      response: {
        200: S.ref('#ticket'),
        404: S.ref('#message')
      }
    }
  }, async function (request, reply) {
    const { id } = request.params;
    const ticket = await ticketsCollection.findOne({
      _id: new ObjectId(id),
      username: request.user.username
    })

    if (!ticket) {
      reply.code(404)
      return { message: 'No ticket found' }
    }

    return ticket
  })

  fastify.post('/ticket', {
    schema: {
      tags: ['tickets'],
      description: 'Create a new ticket with the given information',
      body: S.object()
        .prop('subject', S.string().required())
        .prop('body', S.string().required())
        .prop('creation-date', S.string().format('date-time').required()),
      response: {
        200: S.ref('#ticket')
      }
    }
  }, async function (request, reply) {
    const ticket = request.body
    Object.assign(ticket, {
      username: request.user.username
    })

    const data = await ticketsCollection.insertOne(ticket)
    const _id = data.ops[0]._id

    return Object.assign({
      _id
    }, ticket)
  })
}

module.exports.autoPrefix = '/api'

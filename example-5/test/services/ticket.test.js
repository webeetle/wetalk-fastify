'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('Test for DELETE /api/ticket', async (t) => {
  t.plan(2)
  const app = build(t)

  const res = await app.inject({
    method: 'DELETE',
    url: '/api/ticket'
  })

  t.deepEqual(JSON.parse(res.payload), { data: 'DELETE ok!' })
  t.equal(res.statusCode, 200)
})

test('Test for GET /api/ticket', async (t) => {
  t.plan(2)
  const app = build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/api/ticket'
  })

  t.deepEqual(JSON.parse(res.payload), { data: 'GET ok!' })
  t.equal(res.statusCode, 200)
})

test('Test for POST /api/ticket', async (t) => {
  t.plan(2)
  const app = build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/api/ticket'
  })

  t.deepEqual(JSON.parse(res.payload), { data: 'POST ok!' })
  t.equal(res.statusCode, 200)
})

test('Test for PUT /api/ticket', async (t) => {
  t.plan(2)
  const app = build(t)

  const res = await app.inject({
    method: 'PUT',
    url: '/api/ticket'
  })

  t.deepEqual(JSON.parse(res.payload), { data: 'PUT ok!' })
  t.equal(res.statusCode, 200)
})



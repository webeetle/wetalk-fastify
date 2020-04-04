'use strict'

const S = require('fluent-schema')

module.exports = S.object()
  .id('#message')
  .prop('message', S.string())
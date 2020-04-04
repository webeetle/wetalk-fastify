'use strict'

const S = require('fluent-schema')

module.exports = S.object()
  .id('#ticket')
  .prop('_id', S.string())
  .prop('subject', S.string())
  .prop('body', S.string())
  .prop('username', S.string())
  .prop('creation-date', S.string().format('date-time'))
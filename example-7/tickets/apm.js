'use strict'

const isDocker = require('is-docker')
const apm = require('elastic-apm-node')

apm.start({
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: `http://${isDocker() ? 'apm-server' : 'localhost'}:8200`,
})
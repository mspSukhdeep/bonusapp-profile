'use strict'

/* eslint-disable */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?path=/home/__webpack_hmr&noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})

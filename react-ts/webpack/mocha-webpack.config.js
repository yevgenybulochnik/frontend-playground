const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./base.config.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
})

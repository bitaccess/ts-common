const base = require('@faast/ts-config/library/rollup.config')
const pkg = require('./package.json')

const baseConfig = base(pkg)

const externalModuleRegexp = new RegExp(__dirname + '/node_modules/([\\w-_]+)/.*')

export default {
  ...baseConfig,
  external: [
    ...baseConfig.external,
    // Don't want these in build artifacts
    'fp-ts/lib/Record',
    'io-ts/lib/Reporter',
  ]
}

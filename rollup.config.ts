import base from '@faast/ts-config/lib/library/rollup.config'

const pkg = require('./package.json')

export default {
  ...base(pkg),
  // overrides here
}

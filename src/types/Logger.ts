import * as t from 'io-ts'

// Define a custom LoggerType that uses an underlying LoggerCodec because io-ts
// doesn't support function signatures. The inferred LoggerCodec type is
// incompatible with the static Logger interface.

export type LoggerFn = (...args: any[]) => void

export interface Logger {
  error: LoggerFn
  warn: LoggerFn
  info: LoggerFn
  log: LoggerFn
  debug: LoggerFn
  trace: LoggerFn
}

const LoggerCodec = t.type(
  {
    error: t.Function,
    warn: t.Function,
    info: t.Function,
    log: t.Function,
    debug: t.Function,
    trace: t.Function,
  },
  'Logger',
)

class LoggerType extends t.Type<Logger> {
  readonly _tag: 'LoggerType' = 'LoggerType'
  constructor() {
    super(
      'Logger',
      (u): u is Logger => LoggerCodec.is(u),
      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
      t.identity,
    )
  }
}

export interface LoggerC extends LoggerType {}
export const Logger: LoggerC = new LoggerType()

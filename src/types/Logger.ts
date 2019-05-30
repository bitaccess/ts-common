import * as t from 'io-ts'

export const Logger = t.type(
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
export type LoggerFn = (...args: any[]) => void
export interface Logger extends t.TypeOf<typeof Logger> {
  error: LoggerFn
  warn: LoggerFn
  info: LoggerFn
  log: LoggerFn
  debug: LoggerFn
  trace: LoggerFn
}

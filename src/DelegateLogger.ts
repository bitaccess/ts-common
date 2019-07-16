import { Logger } from './types'

export class DelegateLogger implements Logger {
  logger: Logger | null

  constructor(logger?: Logger | null | undefined, private readonly prefix?: string) {
    this.logger = typeof logger === 'undefined' ? console : logger
    if (prefix) {
      this.prefix = `[${prefix}]`
    }
  }

  private delegate(method: keyof Logger) {
    return (...args: any[]) => {
      if (this.logger !== null) {
        if (this.prefix) {
          this.logger[method](this.prefix, ...args)
        } else {
          this.logger[method](...args)
        }
      }
    }
  }

  error = this.delegate('error')
  warn = this.delegate('warn')
  info = this.delegate('info')
  log = this.delegate('log')
  debug = this.delegate('debug')
  trace = this.delegate('trace')
}

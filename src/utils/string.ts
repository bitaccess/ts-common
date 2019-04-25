import { getFunctionName } from 'io-ts'

export function stringify(v: any): string {
  if (typeof v === 'undefined') {
    return 'undefined'
  }
  if (typeof v === 'function') {
    return getFunctionName(v)
  }
  if (typeof v === 'number' && !isFinite(v)) {
    if (isNaN(v)) {
      return 'NaN'
    }
    return v > 0 ? 'Infinity' : '-Infinity'
  }
  return JSON.stringify(v)
}

export function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

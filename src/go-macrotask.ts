import { setImmediate } from 'extra-timers'
import { Awaitable } from 'justypes'

export function goMacrotask<T>(fn: () => Awaitable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    setImmediate(async () => {
      try {
        resolve(await fn())
      } catch (e) {
        reject(e)
      }
    })
  })
}

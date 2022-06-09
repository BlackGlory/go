import { Awaitable } from 'justypes'

export function goMicrotask<T>(fn: () => Awaitable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    queueMicrotask(async () => {
      try {
        resolve(await fn())
      } catch (e) {
        reject(e)
      }
    })
  })
}

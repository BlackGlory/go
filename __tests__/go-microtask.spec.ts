import { goMicrotask } from '@src/go-microtask'
import '@blackglory/jest-matchers'
import { getErrorPromise } from 'return-style'

describe('goMicrotask', () => {
  describe('sync', () => {
    test('return value', async () => {
      let count = 0
      const fn = jest.fn(() => ++count)

      const promise = goMicrotask(fn)
      queueMicrotask(() => count++)
      const result = await promise

      expect(promise).toBePromise()
      expect(result).toBe(1)
      expect(fn).toBeCalledTimes(1)
    })

    test('throw error', async () => {
      const fn = jest.fn(() => {
        throw new Error('foo')
      })

      const promise = goMicrotask(fn)
      const err = await getErrorPromise(promise)

      expect(promise).toBePromise()
      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('async', () => {
    test('resolved', async () => {
      let count = 0
      const fn = jest.fn(async () => ++count)

      const promise = goMicrotask(fn)
      queueMicrotask(() => count++)
      const result = await promise

      expect(promise).toBePromise()
      expect(result).toBe(1)
      expect(fn).toBeCalledTimes(1)
    })

    test('rejected', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('foo'))

      const promise = goMicrotask(fn)
      const err = await getErrorPromise(promise)

      expect(promise).toBePromise()
      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })
})

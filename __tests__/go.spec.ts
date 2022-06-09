import { go } from '@src/go'
import '@blackglory/jest-matchers'
import { getError, getErrorPromise } from 'return-style'

describe('go', () => {
  describe('sync', () => {
    test('return value', () => {
      const fn = jest.fn().mockReturnValue('foo')

      const result = go(fn)

      expect(result).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })

    test('throw error', () => {
      const fn = jest.fn(() => {
        throw new Error('foo')
      })

      const err = getError(() => go(fn))

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('async', () => {
    test('resolved', async () => {
      let count = 0
      const fn = jest.fn(async () => ++count)

      const promise = go(fn)
      queueMicrotask(() => count++)
      const result = await promise

      expect(promise).toBePromiseLike()
      expect(result).toBe(1)
      expect(fn).toBeCalledTimes(1)
    })

    test('rejected', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('foo'))

      const promise = go(fn)
      const err = await getErrorPromise(promise)

      expect(promise).toBePromiseLike()
      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })
})

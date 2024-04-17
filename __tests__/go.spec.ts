import { describe, test, expect, vi } from 'vitest'
import { go } from '@src/go.js'
import { getError, getErrorPromise } from 'return-style'

describe('go', () => {
  describe('sync', () => {
    test('return value', () => {
      const fn = vi.fn().mockReturnValue('foo')

      const result = go(fn)

      expect(result).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })

    test('throw error', () => {
      const fn = vi.fn(() => {
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
      const fn = vi.fn(async () => ++count)

      const promise = go(fn)
      queueMicrotask(() => count++)
      const result = await promise

      expect(result).toBe(1)
      expect(fn).toBeCalledTimes(1)
    })

    test('rejected', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('foo'))

      const promise = go(fn)
      const err = await getErrorPromise(promise)

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })
})

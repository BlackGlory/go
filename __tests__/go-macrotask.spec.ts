import { describe, test, expect, vi } from 'vitest'
import { goMacrotask } from '@src/go-macrotask.js'
import { getErrorPromise } from 'return-style'

describe('goMacrotask', () => {
  describe('sync', () => {
    test('return value', async () => {
      let count = 0
      const fn = vi.fn(() => ++count)

      const promise = goMacrotask(fn)
      queueMicrotask(() => count++)
      const result = await promise

      expect(result).toBe(2)
      expect(fn).toBeCalledTimes(1)
    })

    test('throw error', async () => {
      const fn = vi.fn(() => {
        throw new Error('foo')
      })

      const promise = goMacrotask(fn)
      const err = await getErrorPromise(promise)

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('async', () => {
    test('resolved', async () => {
      let count = 0
      const fn = vi.fn(async () => ++count)

      const promise = goMacrotask(fn)
      queueMicrotask(() => count++)
      const result = await promise

      expect(result).toBe(2)
      expect(fn).toBeCalledTimes(1)
    })

    test('rejected', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('foo'))

      const promise = goMacrotask(fn)
      const err = await getErrorPromise(promise)

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })
})

import { describe, test, expect, vi } from 'vitest'
import { goAsyncGenerator } from '@src/go-async-generator.js'
import { getErrorAsync } from 'return-style'
import { toArrayAsync } from 'iterable-operator'

describe('goAsyncGenerator', () => {
  describe('non-generator', () => {
    test('return value', async () => {
      const fn = vi.fn()

      await toArrayAsync(goAsyncGenerator(fn))

      expect(fn).toBeCalledTimes(1)
    })

    test('throw error', async () => {
      const fn = vi.fn(() => {
        throw new Error('foo')
      })

      const err = await getErrorAsync(() => toArrayAsync(goAsyncGenerator(fn)))

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('generator', () => {
    test('yield value', async () => {
      const fn = vi.fn(function* () {
        yield
      })

      await toArrayAsync(goAsyncGenerator(fn))

      expect(fn).toBeCalledTimes(1)
    })

    test('throw error', async () => {
      const fn = vi.fn(function* () {
        throw new Error('foo')
      })

      const err = await getErrorAsync(() => toArrayAsync(goAsyncGenerator(fn)))

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('async generator', () => {
    test('yield value', async () => {
      const fn = vi.fn(async function* () {
        yield
      })

      await toArrayAsync(goAsyncGenerator(fn))

      expect(fn).toBeCalledTimes(1)
    })

    test('throw error', async () => {
      const fn = vi.fn(async function* () {
        throw new Error('foo')
      })

      const err = await getErrorAsync(() => toArrayAsync(goAsyncGenerator(fn)))

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })
})

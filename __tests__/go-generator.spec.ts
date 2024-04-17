import { describe, test, expect, vi } from 'vitest'
import { goGenerator } from '@src/go-generator.js'
import { getError } from 'return-style'
import { toArray } from 'iterable-operator'

describe('goGenerator', () => {
  describe('non-generator', () => {
    test('return value', () => {
      const fn = vi.fn()

      toArray(goGenerator(fn))

      expect(fn).toBeCalledTimes(1)
    })

    test('throw error', () => {
      const fn = vi.fn(() => {
        throw new Error('foo')
      })

      const err = getError(() => toArray(goGenerator(fn)))

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('generator', () => {
    test('yield value', () => {
      const fn = vi.fn(function* () {
        yield
      })

      toArray(goGenerator(fn))

      expect(fn).toBeCalledTimes(1)
    })

    test('throw error', () => {
      const fn = vi.fn(function* () {
        throw new Error('foo')
      })

      const err = getError(() => toArray(goGenerator(fn)))

      expect(err).toBeInstanceOf(Error)
      expect(err?.message).toBe('foo')
      expect(fn).toBeCalledTimes(1)
    })
  })
})

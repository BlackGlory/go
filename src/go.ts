export function go<T>(fn: () => T): T {
  return fn()
}

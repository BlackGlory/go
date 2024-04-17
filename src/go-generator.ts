export function* goGenerator<Yield, Next>(
  fn: () =>
  | void
  | Generator<Yield, void, Next>
): Generator<Yield, void, Next> {
  const generator = fn()
  if (generator) {
    yield* generator
  }
}

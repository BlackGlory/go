export async function* goAsyncGenerator<Yield, Next>(
  fn: () =>
  | void
  | Generator<Yield, void, Next>
  | AsyncGenerator<Yield, void, Next>
): AsyncGenerator<Yield, void, Next> {
  const generator = fn()
  if (generator) {
    yield* generator
  }
}

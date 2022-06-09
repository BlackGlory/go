# go
## Install
```sh
npm install --save @blackglory/go
# or
yarn add @blackglory/go
```

## Usage
```ts
import { go } from '@blackglory/go'

go(async () => {
  ...
})
```

## Why?
[IIFE] is good until you forget to invoke it:

```ts
;(async () => {
  ...
}) // oops!
```

The semicolon-free style is good until you forget to add a semicolon before the IIFE:

```ts
const arr = []

// oops!
(async () => {
  ...
})()
```

[IIFE]: https://en.wikipedia.org/wiki/Immediately_invoked_function_expression

## API
### go
```ts
function go<T>(fn: () => T): T
```

### goMicrotask
```ts
function goMicrotask<T>(fn: () => Awaitable<T>): Promise<T>
```

### goMarcotask
```ts
function goMarcotask<T>(fn: () => Awaitable<T>): Promise<T>
```

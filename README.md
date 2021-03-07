# go

## Install

```sh
npm install --save @blackglory/go
# or
yarn add @blackglory/go
```

[IIFE]: https://en.wikipedia.org/wiki/Immediately_invoked_function_expression

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

## API

### go

```ts
function go<T>(fn: () => T): T
```

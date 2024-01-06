---
title: 'About TypeScript'
layout: home
---
### Write type-safe function judgement in TypeScript
```ts twoslash
// @errors: 18046
export function isFunction<T extends Function>(_: unknown): _ is T {
  return typeof _ === 'function'
}

console.clear()
//       ^|



window.open()
//      ^?


// tests
const a: unknown = () => 1

if (isFunction(a)) {
  const r = a() // ✅
} else {
  const r = a() // ❌
}
```
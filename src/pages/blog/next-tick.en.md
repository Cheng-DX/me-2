---
title: nextTick function returns a Promise
i18n: true
lang: en
---

I just found out today that if you don't provide a callback function, then `nextTick` will return a `Promise`. You can add your callback in the `.then` method of this `Promise`.

```ts twoslash
import { nextTick } from 'vue'

const result = nextTick()
//    ^?

```

So in async functions, you can completely use await to avoid unnecessary callback functions.

```ts twoslash
import { nextTick } from 'vue'

async function a() {
  // change states
  await nextTick()
  // do something with the new doms
}
```

Thanks to Anthony Fu's code. [View source code](https://github.com/antfu/vite-plugin-inspect/blob/main/src/client/components/DiffEditor.vue#L64)

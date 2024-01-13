---
title: nextTick函数返回一个Promise
i18n: true
lang: zh-CN
---

直到今天我才知道，如果你没有提供一个回调函数，那么`nextTick`将返回一个`Promise`，你可以在这个`Promise`的`.then`方法中添加你的回调。

```ts twoslash
import { nextTick } from 'vue'

const result = nextTick()
//    ^?

```

所以在`async`函数中，你完全可以使用`await`来避免多余的回调函数。

```ts
import { nextTick } from 'vue'

async function a() {
  // change states
  await nextTick()
  // do something with the new doms
}
```

感谢Anthony Fu的代码。[查看源代码](https://github.com/antfu/vite-plugin-inspect/blob/main/src/client/components/DiffEditor.vue#L64)
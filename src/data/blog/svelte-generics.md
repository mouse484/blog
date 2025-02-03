---
title: Sveteでジェネリクスを使う
tags:
  - Svelte
description: ""
createdAt: 2023-12-14
updatedAt: 2025-02-03
---

```svelte
<script lang="ts" generics="Item extends { text: string }">
  interface Props {
    items: Item[];
    select(item: Item): void;
  }

  let { items, select }: Props = $props();
</script>

{#each items as item}
  <button onclick={() => select(item)}>
    {item.text}
  </button>
{/each}
```

v4の時は変更あるかもと言われてたがv5ではドキュメントにも記載されているのでこれで問題なさそう。

---

https://svelte.dev/docs/svelte/typescript#Generic-$props

[RFC](https://github.com/dummdidumm/rfcs/blob/ts-typedefs-within-svelte-components/text/ts-typing-props-slots-events.md)

---
title: 'SvelteでVue.jsみたいにインラインCSSを使うライブラリを作った'
tags:
  - Svelte
  - CSS
createdAt: 2021-05-18
canonicalUrl: https://zenn.dev/mouse_484/articles/svelte-inline-css
---

# 作ったもの

https://github.com/mouse484/svelte-inline-css

ここで試せます。
https://svelte.dev/repl/04705a80122e4e4ba8ffd3db1cc3f49e?version=3.38.2

# なんで作ったか

- 標準でいい感じにインライン CSS が書けなかった
  - 動的に CSS を変更するとしたら結構面倒くさい
- [svelte-css-vars](https://github.com/kaisermann/svelte-css-vars)というライブラリがあったが css の var が楽に使えるだけで別に追加で css を書かないといけなくてめんどくさかった
- [Vue.js のインライン CSS](https://zenn.dev/mouse_484/articles/vue-inline-style) が使いやすいからほぼそれと同じ使い方ができるようにしたかった

[作った経緯のメモ](https://zenn.dev/mouse_484/scraps/b5306933034466)

# 使い方

```
yarn add svelte-inline-css
```

```vue:.svelte
<script lang="ts">
  import style from 'svelte-inline-css';
  export let height: `${number}px` = '0px';
</script>

<div use:style={{ height, backgroundColor: 'pink' }} />
```

Vue.js とほとんど一緒で CSS プロパティは camelCase を使用します。

Vue.js v3 のドキュメントと全く同じ書き方をした[例](https://github.com/mouse484/svelte-inline-css/blob/main/example/src/App.svelte)があります。

# これから

- Vue.js と挙動をほぼ一致させる
  - ~~Array Syntax~~
    - 実装 [v1.2.0](https://github.com/mouse484/svelte-inline-css/releases/tag/v1.2.0)
  - Auto-prefixing
  - Multiple Values
- インラインに展開するんじゃなくて CSS として出力できるようにしたい
  - SvelteKit とかビルドツールによって色々ありそうだからできたら程度

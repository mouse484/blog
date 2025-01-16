---
title: 'Rollupで警告を無視する'
tags:
  - Rollup
createdAt: 2021-05-09
canonicalUrl: https://zenn.dev/mouse_484/articles/rollup-suppress-warning-messages
---

Rollup はデフォルトで警告(warn)があるとエラーが発生したかのごとくコンソールにログを表示します。

```
// 例
(!) `this` has been rewritten to `undefined`
```

基本的には警告を修正すれば良いのですが外部モジュールなど修正が困難な場合警告を無視したいです。

# --silent を使用する

[--silent](https://rollupjs.org/guide/en/#--silent)を使ってすべての警告を無視します。
しかし、すべての警告を無視してしまうので以下の onwarn を使用する方法をおすすめします。

```
rollup -c --silent
```

# onwarn を使用する

config の[onwarn](https://rollupjs.org/guide/en/#onwarn)を用いて警告のハンドリングができます。

#### warining.code

code を使って種類別に警告を無視します。
この場合最初の例の this 関連の警告が無視できます。
ドキュメントを探しても code 一覧などなかったので都度 onwarn 内で console.log などをして code を確認してください。

```js:rollup.config.js
export default {
  onwarn: (warning, defaultHandler) => {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return
    }
    defaultHandler(warning)
  }
}
```

#### warning.loc.file

警告の発生場所(loc)からファイルパスを取得してそこから一部ディレクトリまたはファイルの警告を無視します。
この場合は node_modules の警告を無視します。
外部モジュールであればこちらを使うのをおすすめします。

```js:rollup.config.js
export default {
  onwarn: (warning, defaultHandler) => {
    if (warning.loc.file.includes('/node_modules/')) {
      return
    }
    defaultHandler(warning)
  }
}
```

### 参考

- [Suppress warning messages · Issue #408 · rollup/rollup](https://github.com/rollup/rollup/issues/408)

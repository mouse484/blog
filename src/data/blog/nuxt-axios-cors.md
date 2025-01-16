---
title: 'Nuxt.js AxiosでCORSエラーを直す(Proxy)'
tags:
  - Nuxt.js
  - Vue.js
  - Axios
  - CORS
createdAt: 2021-04-20
canonicalUrl: https://zenn.dev/mouse_484/articles/nuxt-axios-cors
---

## 解決方法

```js:nuxt.config.js
export default {
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true,
  },
  proxy: {
    '/api/': 'http://api.example.com',
  }
}
```

## 解説

1. proxy を有効にする

```js
export default {
  axios: {
    proxy: true,
  }
}
```

:::message
[nuxt/axios](https://axios.nuxtjs.org/)には[nuxt/proxy](https://github.com/nuxt-community/proxy-module)が含まれているので追加でインストールや`modules`への指定はいりません。
:::

2. proxy で使うパスを指定する

```js
export default {
  proxy: {
    '/api1/': 'http://example.com',
    '/api2/': {
      target: 'http://example.com',
      pathRewrite: { '^/api/': '' }
    },
    '/api3/': {
      target: 'http://example.com',
      pathRewrite: { '^/api/': '/' }
    },
  }
}
```

3. APIを叩く

```js:.vue
this.$axios.get('/api1');      // http://example.com/api1
this.$axios.get('/api1/test'); // http://example.com/api1/test
this.$axios.get('/api2');      // http://example.com/api2
this.$axios.get('/api3');      // http://example.com
this.$axios.get('/api3/test'); // http://example.com/test
```

右側のコメント部分が実際にリクエストされるURLです。

## まとめ

[nuxt/axiosのproxy](https://axios.nuxtjs.org/options/#proxy)を設定してCORSエラーを回避してAPIなどを使えるようになりました。

色々なサイトを見ると今回の例の`/api1`や`/api2`をよく見ますが実際に使うとき普通なら`/api3`が使いやすいと考えます。

間違いや質問などありましたら気軽にコメントしてください。

（[Nuxt.js Axios moduleでCORSエラーの優しい対処法](https://qiita.com/mouse_484/items/71f77aef3dfe5216a71b)の書き直しです。）

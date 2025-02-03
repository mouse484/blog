---
title: VercelとCloudflareでリダイレクトループ問題を解決する
tags:
  - Vercel
  - Cloudflare
description: ""
createdAt: 2023-11-26
updatedAt: 2024-02-03
---

Cloudflareで管理しているドメインをVercelで使うとリダイレクトループが発生してしまう問題点の解決メモ。

```
ERR_TOO_MANY_REDIRECTS
```

### 理由

`SSL/TLS 暗号化モード`が`フレキシブル`の場合に発生する

フレキシブルの時、Cloudflareは初めにhttpでリクエストを送る。
Vercelはhttpリクエストを受け取るとhttpsに308でリダイレクトする。
Cloudflareはhttpをhttpsとしてユーザーに返すが、Vercelでリダイレクトされているため、リダイレクトループが発生する。

##### 参考

https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/

https://vercel.com/guides/resolve-err-too-many-redirects-when-using-cloudflare-proxy-with-vercel

https://zenn.dev/keitakn/articles/add-cloudflare-domain-to-vercel

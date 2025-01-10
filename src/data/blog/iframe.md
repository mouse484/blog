---
title: ifreameが貫通するのを直すメモ
tags:
  - css
  - html
pubDate: 2019-10-16
canonicalUrl: https://qiita.com/mouse_484/items/60f3c516d705bac60220
---

ifreameで埋め込むとき貫通するのを直そうと思ったけどcssじゃ出来なかったのでその時のメモ

# ifreamだと貫通する~~🖕~~

ifreamでサイト埋め込んでサイズをでかくするとfloatで貫通するみたいになる。

# 試したこと

## 1. clearFix

clearFixっていうfloatで貫通したときに直せる方法試してみた

そもそもfloat使ってないし出来ない

## 2. マージンを下にかける

デキるにはできるけどレスポンシブできなくなる

## 3. objectを使う

できた！！！！！！！！！！！！！！！！！！！！！！！！！！

# Objectの使い方

```html
<object data="url"></object>
```

はい、これだけ
ifreamのsrcをdataに入れるだけ

# おわりに

ただのメモを読んでくれてありがとう

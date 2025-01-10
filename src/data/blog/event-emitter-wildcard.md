---
title: EventEmitterですべてのイベントを取得する（ワイルドカード）
tags:
  - Node.js
pubDate: 2019-12-04
canonicalUrl: https://qiita.com/mouse_484/items/a2f0b82a8f02dcf42404
---

Node.jsのEventEmitterは便利なんですがすべてのイベントを取得できません。

[EventEmitter2](https://github.com/EventEmitter2/EventEmitter2)というEventEmitterを便利にしたものがありこれを使えば良いのですが、更新が止まっています...

## コード

```js:index.js
// いつものEventEmitter
const EventEmitter = require('node:events')

// いつものEventEmitterを拡張
class ExtendEventEmitter extends EventEmitter {
  // emitされた内容を"*"に再emit
  emit(name, ...args) {
    return super.emit('*', name, ...args)
  }
}

// 拡張したEventEmitter
const event = new ExtendEventEmitter()

// ワイルドカードでイベントを受ける
event.on('*', (name, ...callback) => {
  console.log(`name: ${name} |`, ...callback)
})

/* emit */
event.emit('ready', 'ready...')

event.emit('number', 1, 2, 3, 4)

event.emit('array', ['a', 'b'])

event.emit('object', { abc: 123, def: 456 })
```

## 結果

```
name: ready  | ready...
name: number | 1 2 3 4
name: array  | [ 'a', 'b' ]
name: object | { abc: 123, def: 456 }
```

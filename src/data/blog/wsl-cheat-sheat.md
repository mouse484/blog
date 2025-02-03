---
title: "WSLチートシート"
tags:
  - WSL
createdAt: 2022-10-04
canonicalUrl: https://zenn.dev/mouse_484/articles/wsl-cheat-sheat
---

# コマンド編

### 一覧表示

```sh
wsl -l -v
```

```:例
  NAME          STATE           VERSION
* Ubuntu        Running         2
  Debian        Stopped         1
  Ubuntu-20.04  Stopped         2
```

`wsl --list --verbose`の略`wsl --list`だとディストリビューションの名前しかでなくて使いものにならないので基本こちら。

### wsl を終了

```sh:すべて
wsl --shutdown
```

```sh:特定のディストリビューション
wsl --terminate <ディストリビューション>
```

とりあえずバグったら使えば OK なイメージ。
基本 shutdown で◯。
普段は閉じて時間経過で終了するのであまり使わない。

### ディストリビューションを追加

```sh
wsl -d <ディストリビューション>
```

`wsl --install --distribution`の略、↓ で確認してからするといい。

### インストールできるディストリビューションを確認

```sh
wsl --l --o
```

```:例
NAME            FRIENDLY NAME
Ubuntu          Ubuntu
Debian          Debian GNU/Linux
kali-linux      Kali Linux Rolling
openSUSE-42     openSUSE Leap 42
SLES-12         SUSE Linux Enterprise Server v12
Ubuntu-16.04    Ubuntu 16.04 LTS
Ubuntu-18.04    Ubuntu 18.04 LTS
Ubuntu-20.04    Ubuntu 20.04 LTS
```

`wsl --list --online`の略。

### ディストリビューションを削除

```sh
wsl --unregister <ディストリビューション>
```

### WSL のバージョンを変える

```sh
wsl --set-version <ディストリビューション> <バージョン 1 or 2>
```

### その他詳細

https://learn.microsoft.com/ja-jp/windows/wsl/basic-commands

# Docker (not desktop)

### Ubuntu 20.04

https://zenn.dev/taiga533/articles/11f1b21ef4a5ff

### Ubuntu 22.04

インストールは適当に https://docs.docker.com/engine/install/ubuntu/

##### Docker daemon の起動

Systemd を PID=1 で使えるようにしないとだめ。
以下を実行すれば OK。

```sh
$ /usr/libexec/wsl-systemd
$ /usr/libexec/nslogin
```

あとはよしなに。

参考:
https://level69.net/archives/31296
https://qiita.com/shigeokamoto/items/ca2211567771cf40a90d
https://zenn.dev/takai404/articles/8088f8688018de#%E5%85%88%E4%BA%BA%E3%81%AE%E7%9F%A5%E6%81%B5

# WSL を別のドライブにする

exportしてから移動したいドライブ側importする。
もっといい方法ほしい。

https://blog.ojisan.io/wsl-reinstall-d

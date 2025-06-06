---
title: Mac OSでCLIからゴミ箱にファイルを移動する
tags:
  - Mac
  - Terminal
createdAt: 2025-04-12
---

# 要約

```zsh
trash <file/directory>
```

# 詳細

これまでは、brewでインストールできる`rmtrash`や`trash`もしくは、[macos-trash](https://github.com/sindresorhus/macos-trash)を使っていた。

MacOS 14.0 (Sonoma)から、`trash`コマンドが標準でインストールされているので別途インストールする必要はない。

## 自分の使い方

以下のように`rm`のエイリアスとして設定している。
`-r`や`-f`のようなオプションがなくそのままディレクトリやファイルを渡すだけで、ゴミ箱に移動する。ï

```zsh
alias rm="trash"
```

### Man ページの写し

```
TRASH(8)            System Manager's Manual           TRASH(8)

NAME
     trash – Moves files and directories to the user trash
     folder

SYNOPSIS
     trash [-h] [--help] [-s] [-stopOnError] [-v] [--verbose]
           FILE [FILE...]

DESCRIPTION
     The trash moves files and directories into the user trash
     folder.  The options are as follows:

     -h | --help
                display usage information for the tool and
                exit

     -v | --verbose
                display more verbose status

     -s | --stopOnError
                exit with an error if any move to a trash
                folder fails

EXAMPLES
     In a directory with a file named "Foo.txt" and a
     directory "Bar",

     trash Foo.txt Bar

     moves the file and directory into the user's trash
     folder, if it exists and permissions allow the items to
     be moved into the user's trash folder.

HISTORY
     First appeared in macOS 14.0

macOS                    May 25, 2022                    macOS
```

# 参考

https://github.com/sindresorhus/macos-trash/issues/26

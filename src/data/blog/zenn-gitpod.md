---
title: 'Gitpod + Zenn CLIを使ってクラウドIDEで記事作成'
tags:
  - Gitpod
  - Zenn
createdAt: 2020-09-21
canonicalUrl: https://zenn.dev/mouse_484/articles/de0f41fca07259c60b08
---

> Zenn と GitHub リポジトリを連携すると、**ローカル**の好きなエディターで投稿コンテンツの作成・編集ができるようになります。
> ローカルでの執筆時には、スムーズにマークダウンファイルの作成したり、コンテンツをプレビューしたりするために「Zenn CLI」を導入しましょう。
> https://zenn.dev/zenn/articles/install-zenn-cli

...

**クラウド**の好きなエディタで記事書きたい。

### [Gitpod](https://www.gitpod.io/)とは

クラウドの開発環境です、Qiita の方に記事がありますので気になる方は[こちら](https://qiita.com/mouse_484/items/394a4984f749cc201422)。

## 前提

- GitHub のアカウントの所持
- Gitpod のアカウントの所持（GitHub 連携でできます）
  Git と npm 関連を基本的に理解しているということで進めていきます

## 本題

1. GitHub リポジトリの作成
2. Gitpod を開く
   リポジトリの URL の前に`gitpod.io#`をつけて起動します
   例:`gitpod.io#https://github.com/username/repo`
3. [Zenn CLI をインストールする](https://zenn.dev/zenn/articles/install-zenn-cli) を参照し CLI をインストール
4. Gitpod の設定をする
   ルートディレクトリに`gitpod.yml`を作成し以下のように設定する。

   ```yml
   tasks:
     - init: npm install
       command: npx zenn preview
   ports:
     - port: 8000
       onOpen: open-preview
   ```

5. コミット&プッシュ
6. 一旦 Gitpod を閉じて 2 のように新しく開き直す
7. 右側にプレビューが出るので`zeen new:article`などで作成し記事を書く
8. 6-7 だけでクラウドのエディターを使って記事が書けます

---
title: GitHub ActionsでGitHub CLIを使う
tags:
  - GitHub Actions
  - GitHub CLI
description: ""
createdAt: 2023-09-21
---

デフォルトでGitHub Actionsの環境にGitHub CLI (gh)がインストールされている。
APIを直接叩くよりも楽に操作可能。

```yaml:公式の例
name: Comment when opened
on:
  issues:
    types:
      - opened
jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - run: gh issue comment $ISSUE --body "Thank you for opening this issue!"
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ISSUE: ${{ github.event.issue.html_url }}
```

---

https://docs.github.com/ja/actions/writing-workflows/choosing-what-your-workflow-does/using-github-cli-in-workflows

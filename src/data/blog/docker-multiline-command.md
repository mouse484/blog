---
title: Dockerfileに複数行コマンドを書く
tags:
  - Docker
description: ""
createdAt: 2023-11-26
updatedAt: 2024-02-03
---

```dockerfile
RUN <<EOF
  command 1
  command 2
EOF
```

- ヒアドキュメントというらしい
- `&&`でつなげるよりも楽

---

https://kakakakakku.hatenablog.com/entry/2021/08/10/085625

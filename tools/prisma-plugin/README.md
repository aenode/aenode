![Version](https://img.shields.io/npm/v/@aenode/prisma-plugin) ![Downloads](https://img.shields.io/npm/dm/@aenode/prisma-plugin) ![Status](https://img.shields.io/github/actions/workflow/status/aenode/aenode/ci.yml) ![Size](https://img.shields.io/bundlephobia/min/@aenode/prisma-plugin)

<p align="center">
  <img   src="https://aenode.github.io/aenode/tools/prisma-plugin/assets/favicon.svg" alt="aenode Logo" height="128" width="128" style="border-radius: 32px;"/>
</p>

## @aenode/prisma-plugin

Prisma plugins

## Install

```sh
  bun add -D @aenode/prisma-plugin
```

## Examples

```ts
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

generator nest {
  provider = "aenode-prisma-nest"
}

datasource db {
  provider = "postgresql"
}

model App {
  id        Int      @id @default(autoincrement())
  uuid      String   @unique @db.Uuid
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  isActive  Boolean  @default(true) @map("is_active")

  name        String  @unique
  description String?
}

```

---

[![CashUp](https://img.shields.io/badge/Cash%20Up-%23EA4AAA.svg?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://cash.app/$puqlib) [![EmainMe](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=proton&logoColor=white)](mailto:aenode+aenode+aenode-prisma-plugin@proton.me)

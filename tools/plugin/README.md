![Version](https://img.shields.io/npm/v/@aenode/plugin) ![Downloads](https://img.shields.io/npm/dm/@aenode/plugin) ![Status](https://img.shields.io/github/actions/workflow/status/aenode/aenode/ci.yml) ![Size](https://img.shields.io/bundlephobia/min/@aenode/plugin)

<p align="center">
  <img   src="https://aenode.github.io/aenode/tools/plugin/assets/favicon.svg," alt="aenode Logo" height="128" width="128" style="border-radius: 32px;"/>
</p>

## @aenode/plugin

Aenode project/resource generator

## Install

```sh
  bun add @aenode/plugin
```

## Example

Generate a nestjs project

```sh
bunx nx g @aenode/plugin:project nest apps/hello-api --orgName="aenode" --version="0.0.1" --email="aenode@proton.me"
```

## Examples

Generate project

```ts
bunx nx g @aenode/plugin:project <projectType:lib|cli|plugin|nest> <directory>

```

Generate nest prisma module

```
bunx nx g @aenode/plugin:prisma-module <projectName> <resourceName>

```

Generate nest rest module

```
bunx nx g @aenode/plugin:nest-module <projectName> <resourceName>

```

---

[![CashUp](https://img.shields.io/badge/Cash%20Up-%23EA4AAA.svg?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://cash.app/$puqlib) [![EmainMe](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=proton&logoColor=white)](mailto:aenode+aenode@proton.me)

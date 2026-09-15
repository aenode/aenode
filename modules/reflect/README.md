![Version](https://img.shields.io/npm/v/@aenode/reflect) ![Downloads](https://img.shields.io/npm/dm/@aenode/reflect) ![Status](https://img.shields.io/github/actions/workflow/status/aenode/aenode/ci.yml) ![Size](https://img.shields.io/bundlephobia/min/@aenode/reflect)


<p align="center">
  <img src="https://aenode.github.io/aenode/modules/reflect/assets/favicon.svg" alt="App logo" height="128" width="128" style="border-radius: 32px;" />
</p>

## @aenode/reflect


Utilities for inspecting TypeScript classes, properties, methods, parameters, and return types at runtime using JavaScript reflection and TypeScript decorator metadata.


## Install

```sh
pnpm add @aenode/reflect
```

## 💖 Support My Work

If you find my open-source contributions or the **@aenode/reflect** project helpful, consider supporting my work. Your sponsorship helps me maintain these projects and explore new enterprise patterns.

[![FundMe](https://img.shields.io/badge/Sponsor%20me-%23EA4AAA.svg?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://cash.app/$puqlib)

---

## 🤝 Connect with Me

<p align="left">
  <a href="mailto:aenode+aenode+reflect@proton.me">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=proton&logoColor=white" />
  </a>
</p>



# Reflection Utilities

Utilities for inspecting TypeScript classes, properties, methods, parameters, and return types at runtime using JavaScript reflection and TypeScript decorator metadata.

This package is built on top of [`reflect-metadata`](https://github.com/rbuckton/reflect-metadata).

## Installation

```bash
pnpm add reflect-metadata
```

Or with Bun:

```bash
bun add reflect-metadata
```

## Requirements

The type-related utilities rely on TypeScript's emitted decorator metadata.

Your TypeScript configuration must therefore enable decorator metadata:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

`reflect-metadata` must also be loaded before using these utilities:

```ts
import 'reflect-metadata';
```

---

## API

### `getPropType()`

Returns the runtime type emitted by TypeScript for a class property.

```ts
getPropType(target, propertyKey): { name: string }
```

#### Example

```ts
class User {
  name!: string;
  age!: number;
  active!: boolean;
}

const nameType = getPropType(User.prototype, 'name');

console.log(nameType.name);
// String
```

The returned value is the runtime constructor recorded in the `design:type` metadata.

For example:

| TypeScript type | Runtime type |
| --------------- | ------------ |
| `string`        | `String`     |
| `number`        | `Number`     |
| `boolean`       | `Boolean`    |
| `Date`          | `Date`       |
| `User`          | `User`       |
| `User[]`        | `Array`      |

> **Important:** TypeScript's emitted metadata does not preserve complete generic type information. For example, both `User[]` and `string[]` are represented as `Array` at runtime.

If no `design:type` metadata exists, the function throws:

```text
Error: Could not resolve type
```

---

### `getReturnType()`

Returns the runtime return type metadata for a method.

```ts
getReturnType(target, methodName)
```

It reads the TypeScript `design:returntype` metadata.

#### Example

```ts
class UserService {
  getUser(): User {
    return new User();
  }
}

const type = getReturnType(
  UserService.prototype,
  'getUser',
);

console.log(type.name);
// User
```

For example:

```ts
class Example {
  getName(): string {
    return '';
  }

  getAge(): number {
    return 0;
  }
}
```

```ts
getReturnType(Example.prototype, 'getName').name;
// String

getReturnType(Example.prototype, 'getAge').name;
// Number
```

If metadata is not available, `Reflect.getMetadata()` returns `undefined`.

---

### `getParamType()`

Returns the runtime types of a method's parameters.

```ts
getParamType(target, methodName)
```

It reads the TypeScript `design:paramtypes` metadata.

#### Example

```ts
class UserService {
  createUser(name: string, age: number, active: boolean) {
    // ...
  }
}

const types = getParamType(
  UserService.prototype,
  'createUser',
);

console.log(types.map(type => type.name));
// ['String', 'Number', 'Boolean']
```

The returned array contains one runtime constructor for each parameter.

```ts
[
  String,
  Number,
  Boolean,
]
```

As with property metadata, generic type information is not preserved.

For example:

```ts
class Example {
  save(users: User[]) {}
}
```

The parameter metadata contains:

```ts
[Array]
```

rather than information describing `User[]`.

---

## Prototype Inspection

The package also provides utilities for discovering methods and properties declared throughout a class's prototype chain.

This means inherited members are included.

### `getMethodNames()`

Returns the names of methods defined on a class and its parent classes.

```ts
getMethodNames(target)
```

#### Example

```ts
class BaseService {
  baseMethod() {}
}

class UserService extends BaseService {
  userMethod() {}
}

console.log(getMethodNames(UserService));
```

Result:

```ts
[
  'userMethod',
  'baseMethod',
]
```

The search continues through the prototype chain until `Object.prototype`.

The following are excluded:

* `constructor`
* non-function properties
* duplicate method names

For example:

```ts
class Base {
  save() {}
}

class Child extends Base {
  save() {}
}
```

The result contains only one `save` entry:

```ts
['save']
```

This is because method names are collected in a `Set`.

---

### `getPropertyNames()`

Returns the names of non-function properties defined on a class and its parent classes.

```ts
getPropertyNames(target)
```

#### Example

```ts
class BaseEntity {
  id!: string;
}

class User extends BaseEntity {
  name!: string;
  email!: string;

  save() {}
}

console.log(getPropertyNames(User));
```

Result:

```ts
[
  'name',
  'email',
  'id',
]
```

Methods are excluded.

The function also walks the prototype chain, so inherited properties are included.

---

## Methods vs. Properties

The two prototype inspection functions intentionally classify members based on their property descriptors.

### Methods

`getMethodNames()` includes members whose descriptor contains a function value:

```ts
typeof descriptor.value === 'function'
```

### Properties

`getPropertyNames()` includes members whose descriptor value is not a function.

```ts
typeof descriptor.value !== 'function'
```

This distinction is important because **TypeScript class fields and decorator metadata are separate concepts from JavaScript prototype properties**.

For example:

```ts
class User {
  name!: string;

  getName() {
    return this.name;
  }
}
```

Depending on how the class is emitted and how fields are initialized, `name` may not exist as an own property of `User.prototype`.

Therefore, `getPropertyNames()` should not be considered a complete TypeScript type-property reflection mechanism. It inspects the JavaScript prototype chain.

---

## Inheritance

Both `getMethodNames()` and `getPropertyNames()` traverse inherited prototypes.

Given:

```ts
class Entity {
  id!: string;

  save() {}
}

class User extends Entity {
  name!: string;

  login() {}
}
```

The utilities inspect:

```text
User.prototype
      ↓
Entity.prototype
      ↓
Object.prototype
```

`Object.prototype` is intentionally excluded.

This prevents built-in members such as:

```text
toString
valueOf
hasOwnProperty
...
```

from appearing in the results.

---

## Runtime Metadata

The metadata functions use the standard TypeScript metadata keys:

```text
design:type
design:returntype
design:paramtypes
```

These metadata values are generated by TypeScript when:

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true
  }
}
```

is enabled.

For example:

```ts
class User {
  name!: string;

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}
```

Conceptually, TypeScript emits metadata equivalent to:

```text
name       → design:type       → String
getName    → design:returntype → String
setName    → design:paramtypes → [String]
```

The reflection utilities provide a small API around reading this metadata.

---

## Limitations

These utilities operate on **runtime JavaScript information**, not the complete TypeScript type system.

### Generic types are not preserved

```ts
users: User[]
```

is generally reflected as:

```ts
Array
```

not:

```text
Array<User>
```

### Union types are not preserved

```ts
value: string | number
```

does not retain the complete union type at runtime.

### Interfaces are not available at runtime

```ts
interface User {
  name: string;
}
```

Interfaces are erased during compilation, so there is no runtime constructor that reflection can return for them.

### Type aliases are erased

```ts
type UserId = string;
```

The runtime type is still:

```ts
String
```

### Property discovery is based on JavaScript prototypes

`getPropertyNames()` does not inspect TypeScript's static type information. It traverses JavaScript prototypes and therefore cannot discover every possible TypeScript class field simply because it exists in the source code.

---

## Typical Usage

These utilities are useful when building decorator-driven frameworks and libraries that need runtime information about classes.

For example:

```ts
class UserController {
  getUser(id: string): User {
    // ...
  }
}
```

A framework can inspect the controller:

```ts
const methods = getMethodNames(UserController);

const returnType = getReturnType(
  UserController.prototype,
  'getUser',
);

const parameterTypes = getParamType(
  UserController.prototype,
  'getUser',
);
```

This can be used as the foundation for features such as:

* Dependency injection
* Controller discovery
* Automatic routing
* Serialization
* Validation
* Schema generation
* ORM/model metadata
* Decorator-based frameworks

---

## API Summary

| Function             | Purpose                                                  |
| -------------------- | -------------------------------------------------------- |
| `getPropType()`      | Gets a property's `design:type` metadata                 |
| `getReturnType()`    | Gets a method's `design:returntype` metadata             |
| `getParamType()`     | Gets a method's `design:paramtypes` metadata             |
| `getMethodNames()`   | Finds methods across the prototype chain                 |
| `getPropertyNames()` | Finds non-function properties across the prototype chain |

## License

See the repository's license for details.

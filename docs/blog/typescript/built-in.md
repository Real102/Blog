# Typescript 常用内置类型

Typescript 内置的一些实用类型，合理的使用有助于提升开发效率

## Partial

将某个类型的所有属性全部转换成可选类型（`string -> string | undefined`）

```typescript
/**
 * lib.es5.d.ts
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

interface Human {
  name: string
  age: number
  phone: number
}

type HumanPartial = Partial<Human>
// type HumanPartial = {
//     name?: string | undefined;
//     age?: number | undefined;
//     phone?: number | undefined;
// }
```

## Required

将某个类型的所有属性全部转换成必选属性。其中 `-?` 的减号为删除的意思

```typescript
/**
 * t
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

interface Human {
  name?: string
  age?: number
  phone?: number
}

type HumanRequired = Required<Human>
// type HumanRequired = {
//     name: string;
//     age: number;
//     phone: number;
// }
```

## Readonly

将某个类型的属性全部转换成只读属性，这也意味着该类型不能重新赋值

```typescript
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

interface Todo {
  title: string
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users"
}

todo.title = "Hello"
// Cannot assign to 'title' because it is a read-only property
```

## Record

`Record<K, T>`：构建一个新的对象类型，要求其属性为 `K`，对应类型为 `T`

```typescript
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T
}

interface CatInfo {
  age: number
  breed: string
}

type CatName = "miffy" | "boris" | "mordred"

type catRecord = Record<CatName, CatInfo>
// type catRecord = {
//   miffy: CatInfo;
//   boris: CatInfo;
//   mordred: CatInfo;
// }
```

## Pick

按字面意思理解即可，从一个类型中挑选出一个/组属性构建成一个新的类型

```typescript
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, "title" | "completed">
// type TodoPreview = {
//     title: string;
//     completed: boolean;
// }
```

## Omit

与 `Pick` 正好相反，从一个类型中剔除一个/组属性后构建成一个新的类型

```typescript
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Omit<Todo, "title" | "completed">
// type TodoPreview = {
//     description: string;
// }
```

```typescript
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;

```

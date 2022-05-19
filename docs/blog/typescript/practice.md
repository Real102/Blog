# TS 练习题

> 1-30 题目来源：<https://juejin.cn/post/7009046640308781063>

记录一下优秀的题目，同时也写下自己的代码与理解

## 第一题：extends

```typescript
type User = {
  id: number
  kind: string
}

function makeCustomer<T extends User>(u: T): T {
  return {
    id: u.id,
    kind: "customer"
  }
}
// Error（TS Playground：v4.6.2）
// Type '{ id: number; kind: string; }' is not assignable to type 'T'.
// '{ id: number; kind: string; }' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'User'.
```

我的代码：

```typescript
function makeCustomer<T extends User>(u: T): T {
  return {
    ...u,
    id: u.id,
    kind: "customer"
  }
}

// 此处需要注意extends的用法：
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types
// https://cloud.tencent.com/developer/article/1884330
```

## 第二题：类型保护

```typescript
function f(a: string | number, b: string | number) {
  if (typeof a === "string") {
    return a + ":" + b // no error but b can be number!
  } else {
    return a + b // error as b can be number | string
  }
}

f(2, 3) // Ok
f(1, "a") // Error
f("a", 2) // Error
f("a", "b") // Ok
```

我的代码：

```typescript
function f(a: string | number, b: string | number) {
  if (typeof a === "string" || typeof b === "string") {
    return a + ":" + b // no error but b can be number!
  } else {
    return a + b // error as b can be number | string
  }
}
```

## 第三题：Partial

```typescript
type Foo = {
  a: number
  b?: string
  c: boolean
}

// 测试用例
type SomeOptional = SetOptional<Foo, "a" | "b">

// type SomeOptional = {
//  a?: number; // 该属性已变成可选的
//  b?: string; // 保持不变
//  c: boolean;
// }
```

我的代码：

```typescript
// Required 是变为必选，非此题要求。
type SetOptional<T, P extends keyof T> = Simplify<
  Partial<Pick<T, P>> & Required<Pick<T, keyof Omit<T, P>>>
>
type Simplify<T> = {
  [K in keyof T]: T[K]
}
```

## 第四题：Pick

```typescript
interface Example {
  a: string
  b: string | number
  c: () => void
  d: {}
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>
//=> {a: string}
```

我的代码：

```typescript
type ConditionalPick<T, P> = {
 [K in keyof T as T[K] extends P ? K : never]: T[K]
}
```

## 第五题

```typescript
type Fn = (a: number, b: string) => number
type AppendArgument<F, A> = // 你的实现代码

type FinalFn = AppendArgument<Fn, boolean>
// (x: boolean, a: number, b: string) => number
```

我的代码：

```typescript
d
```

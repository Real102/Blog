# TS 中的 extends 关键字

## 条件类型

在 `Typescript` 中，`extends` 经常被用于条件类型：`SomeType extends OtherType ? TrueType : FalseType`

官方文档如是说：当左侧的类型 `extends` **可分配**给右侧的类型时，将在第一个分支（“真”分支）中获得类型；否则将在后一个分支（“假”分支）中获得类型

可能会觉得这里的“分配”二字并不太理解，先看下这几个栗子：

```typescript
// v4.7.2
type T1 = string
type T2 = number
type T3 = string | number
type T4 = string | null

type T1T2 = T1 extends T2 ? boolean : never // type T1T2 = never
type T1T3 = T1 extends T3 ? boolean : never // type T1T3 = boolean
type T2T4 = T2 extends T4 ? boolean : never // type T2T4 = never
type T3T4 = T3 extends T4 ? boolean : never // type T3T4 = never
```

也可以复制代码到 `Typescript` 官网的 [Playground](https://www.typescriptlang.org/play) 中调试并查看输出

通过上面的几个栗子，若 `A extends B` 中 `A` 为基础类型且当 `A` 是 `B` 的子集时，都将得到“真”分支的结果；当 `A` 非 `B` 的子集时，都将得到“假”分支的结果。那么此时的**可分配**可以理解为 `A` 是 类型 `B` 的**子集**

注意：**只有非 object 类型的基础类型才能正常套用**

```typescript
interface Human {
  name: string
  phone: number
}
interface Animal {
  name: string
}
type Bool1 = Animal extends Animal ? "yes" : "no" // "yes"
type Bool2 = Animal extends Human ? "yes" : "no" // "no"
type Bool3 = Human extends Animal ? "yes" : "no" // "yes"
```

如果 `extends` 两端是这种情况：如上栗子的 `Bool2`，会发现以子集的方式去理解是错误的

在 [TS 官网](https://www.tslang.cn/docs/release-notes/typescript-2.8.html)有这么一句话：**如果最宽泛的 T 的实例不能赋值给最宽泛的 U 的实例，那么我们就可以断定不存在可以赋值的实例**

取 `Human` 实例为 H1： `{name: '张三', phone: 1980202****}`，取 `Animal` 实例为 A1：`{name: '中华田园犬'}`，这时候再来分析 `Bool2`，不难发现，`A1 extends H1` 时，`A1` 的 `name` 可以赋值给 `H1` 的 `name`，但 `A1` 没有 `phone` 赋值给 `H1` 的 `phone`。回头再看上面的三个栗子，就很容易理解输出结果了

## 分布式有条件类型

还是先看下面的几个栗子：

```typescript
// 来自官方文档栗子
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object"

type T1 = TypeName<string | (() => void)> // "string" | "function"
type T2 = TypeName<string | string[] | undefined> // "string" | "object" | "undefined"
type T3 = TypeName<string[] | number[]> // "object"
```

如果在类型 `TypeName<T>` 中传入的 `T` 为 `naked type parameter`（裸类型参数），那么它会被成为“分布式有条件类型”。分布式有条件类型在实例化时会自动分发成联合类型。 例如，实例化 `T extends U ? X : Y`，`T` 的类型为 `A | B | C`，会被解析为`(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`，也就是传说中的**分配律**

通常下，这种分配性是期望的行为，但也可以主动避免这种分配性，如下：

```typescript
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never
type StrArrOrNumArr = ToArrayNonDist<string | number>
// -> type StrArrOrNumArr = (string | number)[]
```

继续看下面的这个栗子：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts
type Exclude<T, U> = T extends U ? never : T

type T1 = string | null
type T2 = number | null | undefined

type T13 = Exclude<T11, T12> // T13 -> ？
```

`Exclude` 为 `Typescript` 内置的工具类型。将 `T1`、`T2` 代入 `Exclude` 时 `type T3 = Exclude<T1, T2>`，即可拆解为：`(string extends T2 ? never : string) | (null extends T2 ? never : null)`，string 和 null 都是基础类型（如上）可以明显得出 `string` 非 `T2` 的子集，`null` 为 `T2` 的子集，那么结果就是 `type T13 = string`

## 泛型约束

```typescript
function getLength<T extends { length: number }>(arg: T): number {
  return T["length"]
}

getLength([1, 2, 3, 4])
getLength({ name: "wolf" }) //Argument of type '{ name: number; }' is not assignable to parameter of type '{ length: number; }'.
getLength({ length: 2 })
```

泛型约束应该是比较容易理解的，也就是对输入的类型进行限制。如上 `getLength` 限制传入参数必须带有 `length` 属性

## 扩展

**预定义的有条件类型**：`TypeScript 2.8` 在 `lib.d.ts` 里增加了一些预定义的有条件类型：

- `Exclude<T, U>`: 从 `T` 中剔除可以赋值给 `U` 的类型
- `Extract<T, U>`: 提取 `T` 中可以赋值给 `U` 的类型
- `NonNullable<T>`: 从 `T` 中剔除 `null` 和 `undefined`
- `ReturnType<T>`: 获取函数返回值类型
- `InstanceType<T>`: 获取构造函数类型的实例类型

## 参考文档

- <https://www.typescriptlang.org/docs/handbook/2/conditional-types.html>
- <https://www.tslang.cn/docs/release-notes/typescript-2.8.html>

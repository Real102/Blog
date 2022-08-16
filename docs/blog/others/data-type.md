# 数据类型与转换

## 前言

### Buffer 、 ArrayBuffer 、 TypedArray 、 Blob

- `Buffer` 是 `node` 环境下的缓冲器，用于表示固定长度的字节序列（`Buffer.from() | Buffer.alloc()`），可用 `toString()` 方法转成字符串，也可以指定编码格式
- `ArrayBuffer` 是 `window` 环境下的二进制/字节数组，是对固定长度的连续内存空间的引用（`new ArrayBuffer(length)`），可用 [TextDecoder](https://developer.mozilla.org/zh-CN/docs/Web/API/TextDecoder) 🚀 构造函数解析成字符串
- `TypedArray` 称为视图（`Uint8Array，Uint32Array`），是操作 `ArrayBuffer` 的主要途径
- `Blob` 表示一个不可变、原始数据的类文件对象，它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。可以通过 [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 🚀 转换成指定格式

## Buffer

**Buffer** 也叫缓冲区，用于表示固定长度的字节序列，同时很多 node.js 的 API 都支持 `Buffer`。我们可以通过 `Buffer.alloc` 创建一个指定长度的字节序列，也可以通过 `Buffer.from` 将字符串或 JSON 数据转换成字节序列

### Buffer.alloc(size, fill, encoding)

`size`: 初始化的长度  
`fill`: 填充的数据，默认为 0，可选参数  
`encoding`: 编码格式，默认是 'utf-8'，可选参数

```javascript
// 创建一个长度为 10、以零填充的 Buffer。
const buf1 = Buffer.alloc(10)
// <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建一个长度为 10 的 Buffer，其中全部填充了值为 `1` 的字节。
const buf2 = Buffer.alloc(10, 1)
// <Buffer 01 01 01 01 01 01 01 01 01 01>

// 创建一个包含 base64 格式的 Buffer，调用 toString 可以发现转换成了：hello world
const buf3 = Buffer.alloc(11, "aGVsbG8gd29ybGQ=", "base64")
console.log(buf3)
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
// buf3.toString()   ==>  hello world
```

这里需要注意 `size` 这个参数，如果 `size` 不等于 `byteLength` (即数据长度 👩‍🏫)，会导致 `Buffer` 的裁剪或重复

```javascript
const buf4 = Buffer.alloc(10, "aGVsbG8gd29ybGQ=", "base64")
console.log(buf4)
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c>
// buf4.toString()   ==>  hello worl

const buf5 = Buffer.alloc(15, "aGVsbG8gd29ybGQ=", "base64")
console.log(buf5)
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64 68 65 6c 6c>
// buf5.toString()   ==>  hello worldhell
```

### Buffer.from()

`Buffer.from()` 根据输入的数据类型的不同，主要分为一下几种情况：

- **Buffer.from(arrayBuffer|buffer, byteOffset, length)**

`arrayBuffer`: `arrayBuffer` 格式数据  
`byteOffset`: 开始拷贝的索引（下标），默认值为 0，可选参数  
`length`: 拷贝的字节长度，默认是 `arrayBuffer.byteLength - byteOffset`，可选参数

当用户输入的是 `arrayBuffer` 时，`Buffer.from()` 方法执行的是拷贝的操作（注意这里执行的是浅拷贝，不会拷贝底层内存 👩‍🏫）；如果用户输入的是 `buffer` 将拷贝 `buffer` 数据到新建的 `buffer` 实例

```javascript
// ArrayBuffer
let ab = new Uint8Array(10)
let buf = Buffer.from(ab.buffer)
ab[0] = 10
console.log(buf)
// <Buffer 0a 00 00 00 00 00 00 00 00 00>

// buffer
const buf1 = Buffer.from("buffer")
const buf2 = Buffer.from(buf1)
buf1[0] = 0x61
console.log(buf1.toString())
// auffer
console.log(buf2.toString())
// buffer
```

- **Buffer.from(object|string, offsetOrEncoding, length)**

`object|string`: 要编码的字符串  
`offsetOrEncoding`: 字节偏移量或字符编码，如果是 string，此值为编码格式  
`length`: 长度，string 下没有这个参数

如果用户输入的是 `object` 时，`Buffer.from()` 方法执行的是编码操作，转变成 `arrayBuffer` 对象

```javascript
const buf1 = Buffer.from("this is a tést")
const buf2 = Buffer.from("7468697320697320612074c3a97374", "hex")
console.log(buf1.toString())
// this is a tést
console.log(buf2.toString())
// this is a tést
```

- **Buffer.from(array)**

`array`: Array 数组

当用户输入的是 `array` 时，`Buffer.from()` 会使用 0 – 255 范围内的字节数组 array 来分配一个新的 Buffer，超出该范围的数组条目会被截断

```javascript
let buf = Buffer.from([1, 254, 255, 256, -1])
console.log(buf)
// <Buffer 01 fe ff 00 ff>
```

### buf.toString(encoding, start, end)

`encoding`: 编码格式，默认值为 'UTF-8'  
`start`: 开始解码的字节偏移量，默认值为 '0'  
`end`: 结束解码的字节偏移量，默认值: `buf.length`。

这里会根据指定的编码格式去解码，可以传入 `start` 和 `end` 单独解析 `buf` 的子集。如果 `encoding` 为 `utf8`，并且输入中的字节序列 **不是有效的 UTF-8**，则每个无效的字节都会由替换字符 `U+FFFD` 替换。

```javascript
let buf = Buffer.from("hello world")
console.log(buf)
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(buf.toString())
// hello world
console.log(buf.toString("hex", 3, 5))
// 68656c6c6f20776f726c64
```

### buf.write(string, offset, length, encoding)

`string`: 要写入 buf 的字符串  
`offset`: 偏移量，默认值: 0  
`length`: 要写入的最大字节数，默认值: buf.length - offset  
`encoding`: 字符编码，默认值: 'utf8'

将指定的编码格式数据写入到 `buf` 的指定开始位置，如果没有足够的空间保存整个字符串，则只会写入字符串的一部分

```javascript
let buf = Buffer.alloc(10)
buf.write("abcde", 8)
console.log(buf)
// <Buffer 00 00 00 00 00 00 00 00 61 62>
```

### buf[index]

除了 `buf.write` 外，还可以直接用下标的方式 `buf[index]` ，直接获取或修改指定下标的数据

```javascript
let buf = Buffer.from("hello world")
console.log(buf)
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
buf[0] = 69
console.log(buf.toString())
// Eello world
```

### buf.readUInt8(offset)

`offset`: 偏移量

从 buf 中指定的 `offset` 读取 **一个** 无符号的 8 位整数值

```javascript
const buf = Buffer.from("hello world")
console.log(buf)
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(buf.readUInt8(0))
// 104
console.log(buf.readUInt8(1))
// 101
```

---

## ArrayBuffer

`ArrayBuffer` 对象用来表示通用的、固定长度的原始二进制数据缓冲区，也是一个字节数组 (`byte array`)，但与数组 `array` 没有任何共同之处

- 它的长度是固定的，我们无法增加或减少它的长度
- 它正好占用了内存中的那么多空间
- 要访问单个字节，需要另一个“视图”对象（`TypedArray`），而不是 buffer[index]

## TypedArray

`TypedArray` 称为类型化数组，用于描述 `ArrayBuffer` 的一个类数组视图（`Uint8Array、Uint32Array`），是操作 `ArrayBuffer` 的主要途径。但事实上，没有名为 `TypedArray` 的全局属性，也没有一个名为 `TypedArray` 的构造函数。不能直接运行 `new TypedArray()`。当然，我们可以用 `new Uint8Array()` 直接创建一个“视图”，然后也可以用 `.buffer` 来访问 `ArrayBuffer`。而 `Uint8Array` 只是其中的一种 `TypedArray` 类型

```javascript
let buf = new ArrayBuffer(10)
// ArrayBuffer(10) {}
// [[Int8Array]]: Int8Array(10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [[Int16Array]]: Int16Array(5) [0, 0, 0, 0, 0]
// [[Uint8Array]]: Uint8Array(10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let uint = new Uint8Array(buf)
// 同 let uint = new Uint8Array(10)
// Uint8Array(10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

### Uint8Array

`Uint8Array` 表示一个 8 位无符号的整型数组，创建时内容被初始化为 0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。每一项的最大数值为 255，超过 255 会只读右 8 位的数据（如 256：100 000 000，但 Uint8Array 只有 8 位，且仅存储最右边 8 位，其余都被切除，故为 0）

```javascript
// 直接创建 ArrayBuffer / TypedArray
let buf = new ArrayBuffer(10)
// ArrayBuffer(10) {}
// [[Int8Array]]: Int8Array(10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [[Int16Array]]: Int16Array(5) [0, 0, 0, 0, 0]
// [[Uint8Array]]: Uint8Array(10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let buf1 = new Uint8Array(10)
// Uint8Array(10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
buf1[0] = 1
// Uint8Array(10) [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
buf1[1] = 254
// Uint8Array(10) [1, 254, 0, 0, 0, 0, 0, 0, 0, 0]
buf1[2] = 255
// Uint8Array(10) [1, 254, 255, 0, 0, 0, 0, 0, 0, 0]
buf1[3] = 257
// Uint8Array(10) [1, 254, 255, 1, 0, 0, 0, 0, 0, 0]

// 通过 ArrayBuffer 来创建 TypedArray
let buf = new ArrayBuffer(10) // 创建一个长度为 10 的 buffer
let uint = new Uint8Array(buf) // 将 buffer 视为一个 8 位无符号整数的序列
uint[0] = 1 // 手动修改其中一个值
// uint :
// Uint8Array(10) [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// buf :
// ArrayBuffer(10) {}
// [[Int8Array]]: Int8Array(10) [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]...
```

#### Uint8Array.from

从一个数组或可迭代的对象创建一个新的 `Uint8Array` 数组

```javascript
Uint8Array.from([1, 2, 3, 4, 5])
// Uint8Array(5) [1, 2, 3, 4, 5]
```

#### Uint8Array.of

创建一个具有可变数量参数的新类型数组

```javascript
Uint8Array.of(1, 2, 3, 4, 5, 0xa)
// Uint8Array(5) [1, 2, 3, 4, 5, 10]
```

## Blob

Blob 对象表示一个不可变、原始数据的类文件对象。可以用构造函数 `Blob` 创建一个 `blob` 对象，blob 的内容由参数数组中给出的值的串联组成。

```javascript
// Buffer.from('hello world') => <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
let arr = [0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]
// 定义一个视图对象dataview
let buf = new Uint8Array(arr.length)
let blob
// 遍历存储数据
arr.forEach((v, i) => {
  buf[i] = v
})
// 定义一个blob对象
blob = new Blob([buf])
// 使用filereader读取blob数据
let reader = new FileReader()
reader.readAsText(blob)
reader.onload = e => {
  console.log(e.target.result) // hello world
}
```

<!-- Buffer 与字符串之间的转换还有其他的编码格式可选，其他编码格式可以参考 [这里 🚀](http://nodejs.cn/api/buffer.html#buffer_buffers_and_character_encodings)

**Uint8Array** \* n -->

## 参考文档

- [nodeJS](http://nodejs.cn/api/) 🚀
- [ArrayBuffer MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 🚀
- [TypedArray MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 🚀
- [Blob MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 🚀

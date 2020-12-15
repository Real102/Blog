# 技术分享--vscode 中 websocket 的研究

## 入席

-   首先先演示一遍 vscode 页面，及 websocket 数据交互演示。火狐浏览器下可以看到 websocket 传输的具体内容（明文）
-   因为有抓包工具的存在，可以通过抓包的方式看到 websocket 传输的数据，因此需要在这里增加一层加密
-   code-server 相当于 vscode 的服务端，当本地修改文件或执行其他操作时，都会产生 vscode 跟 code-server 的数据交互，并且 vscode 会同时在 browser 和 node 环境下运行

## 开胃菜

### Buffer 、 ArrayBuffer 、 Blob

-   `Buffer` 是 `node` 环境下的缓冲器，用于表示固定长度的字节序列（`Buffer.from() | Buffer.alloc()`），并且 `Buffer` 是 `JavaScript` 的 `Uint8Array` 类的子类，可用 `toString()` 方法转成字符串，也可以指定编码格式
-   `ArrayBuffer` 是用来表示通用的、固定长度的原始二进制数据缓冲区（是浏览器环境下的二进制/字节数组，是对固定长度的连续内存空间的引用）。`ArrayBuffer` 可以通过构造函数 `new ArrayBuffer(length)` 创建，一旦创建之后就不能再修改长度。可用 [TextDecoder](https://developer.mozilla.org/zh-CN/docs/Web/API/TextDecoder) 🚀 构造函数解析成字符串
-   `TypedArray` 称为类型化数组，用于描述 `ArrayBuffer` 的一个类数组视图（`Uint8Array、Uint32Array`），是操作 `ArrayBuffer` 的主要途径。
-   `Blob` 表示一个不可变、原始数据的类文件对象，它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。可以通过 [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 🚀 转换成指定格式

### 按位操作符

-   按位操作符将其操作数当作 32 位的比特序列（由 0 和 1 组成）

| 运算符     | 用法    | 描述                                                          |
| ---------- | ------- | ------------------------------------------------------------- |
| 按位与     | a & b   | 只有两个操作数相应的比特位都是 1 时，结果才为 1，否则为 0     |
| 按位或     | a \| b  | 当两个操作数相应的比特位至少有一个 1 时，结果为 1，否则为 0   |
| 按位异或   | a ^ b   | 当两个操作数相应的比特位有且只有一个 1 时，结果为 1，否则为 0 |
| 按位非     | ~a      | 反转操作数的比特位，即 0 变成 1，1 变成 0                     |
| 左移       | a << b  | 将 a 的二进制形式左移 b (< 32) 位，右边用 0 填充              |
| 有符号右移 | a >> b  | 将 a 的二进制形式右移 b 位                                    |
| 无符号右移 | a >>> b | 将 a 的二进制形式右移 b 位，并使用 0 在左侧填充               |
| 补码       | ---     | 如 a 的负对应值，‘ 按位非 ’ 反转后 +1                         |

来看看粟子：

```javascript
// 有符号右移,会自动判断,若0开头则补0
9 (base 10):       00000000000000000000000000001001 (base 2)
                   --------------------------------
9 >> 2 (base 10):  00000000000000000000000000000010 (base 2) = 2 (base 10)

// 若1开头则补1

-9 (base 10):      11111111111111111111111111110111 (base 2)
                   --------------------------------
-9 >> 2 (base 10): 11111111111111111111111111111101 (base 2) = -3 (base 10)

// 无符号右移

-9 (base 10):       11111111111111111111111111110111 (base 2)
                    --------------------------------
-9 >>> 2 (base 10): 00111111111111111111111111111101 (base 2) = 1073741821 (base 10)
```

## 主食

分析代码

## 饭后甜点

提出问题

## 离席

参考地址

-   [code-server 是如何把 vscode 搬到浏览器的](https://juejin.cn/post/6844904024005672968) 🚀
-   [ArrayBuffer，二进制数组](https://zh.javascript.info/arraybuffer-binary-arrays) 🚀
-   [vscode 源码](https://github.com/microsoft/vscode) 🚀
-   [code-server 源码](https://github.com/cdr/code-server) 🚀
-   [nodeJS API 文档](http://nodejs.cn/api/) 🚀
-   [ArrayBuffer MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 🚀
-   [TypedArray MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 🚀
-   [Blob MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 🚀
-   [按位操作符 MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) 🚀

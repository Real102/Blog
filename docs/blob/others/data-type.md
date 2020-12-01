# 数据类型与转换

## Buffer

__Buffer__ 也叫缓冲区，用于表示固定长度的字节序列，同时很多 node.js 的 API 都支持 `Buffer`。我们可以通过 `Buffer.alloc` 创建一个指定长度的字节序列，也可以通过 `Buffer.from` 将字符串或JSON数据转换成字节序列

### Buffer.alloc(size, fill, encoding)

`size`: 初始化的长度  
`fill`: 填充的数据，默认为0，，可选参数  
`encoding`: 编码格式，默认是 'utf-8'，，可选参数  

```javascript
// 创建一个长度为 10、以零填充的 Buffer。
const buf1 = Buffer.alloc(10);
// <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建一个长度为 10 的 Buffer，其中全部填充了值为 `1` 的字节。
const buf2 = Buffer.alloc(10, 1);
// <Buffer 01 01 01 01 01 01 01 01 01 01>

// 创建一个包含 base64 格式的 Buffer，调用 toString 可以发现转换成了：hello world
const buf3 = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
console.log(buf3)
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
// buf3。toString()   ==>  hello world
```

这里需要注意 `size` 这个参数，如果 `size` 不等于 `byteLength` (即数据长度👩‍🏫)，会导致 `Buffer` 的裁剪或重复

```javascript
const buf4 = Buffer.alloc(10, 'aGVsbG8gd29ybGQ=', 'base64');
console.log(buf4)
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c>
// buf4.toString()   ==>  hello worl

const buf5 = Buffer.alloc(15, 'aGVsbG8gd29ybGQ=', 'base64');
console.log(buf5)
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64 68 65 6c 6c>
// buf5.toString()   ==>  hello worldhell
```

### Buffer.from()

`Buffer.from()` 根据输入的数据类型的不同，主要分为两种情况

-   __Buffer.from(arrayBuffer, byteOffset, length)__

`arrayBuffer`: `arrayBuffer` 格式数据  
`byteOffset`: 开始拷贝的索引（下标），默认值为0，可选参数  
`length`: 拷贝的字节长度，默认是 `arrayBuffer.byteLength - byteOffset`，可选参数  

当用户输入的是 `arrayBuffer` 时，`Buffer.from()` 方法

-   __Buffer.from(object|string, offsetOrEncoding, length)__

Buffer与字符串之间的转换还有其他的编码格式可选，其他编码格式可以参考 [这里🚀](http://nodejs.cn/api/buffer.html#buffer_buffers_and_character_encodings)

__Uint8Array__ 数组类型表示一个8位无符号的整型数组，创建时内容被初始化为0，创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。

node.js 的缓冲区
参考地址：

-   [https://www.runoob.com/nodejs/nodejs-buffer.html](https://www.runoob.com/nodejs/nodejs-buffer.html)  
-   [node.js官网文档地址：http://nodejs.cn/api/buffer.html](http://nodejs.cn/api/buffer.html)

VSBuffer:
protocol.sendControl(VSBuffer.fromString(JSON.stringify(connTypeRequest)));
首先将object转换成json数据格式，然后再调用fromString转换成buffer格式

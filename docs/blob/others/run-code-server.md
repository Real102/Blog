# vscode (cāi)研(dài)究(mǎ)👨‍💻

## 踩过的无底洞 🕳

-   修改的源码要确保不能出现错误如： tslint 提示语法错误的代码等
-   打包的patch文件一定要注意，编码是 __`UTF-8`__，且换行符的格式是：__`LF`__（默认是`CRLF`）
-   如果遇到 patch 合并失败问题，可以先试试清除服务器的缓存，然后再重新执行 `yarn build`
-   `websocket` 数据交互使用的是 __十六进制__ 加密方式，可以用十六进制转字符串方法解码，也可以用 `TextDecoder` 解码
-   注意 `node/ipc.net.ts` 中不能访问 `location` 对象
-   运行过程中有时会一直重连，然后突然崩溃就一直连不上，具体什么原因不清楚

## 猜(mēng)测(bī)🤔

-   `code-server` 基本依赖都是在 `vscode` 上，在浏览器控制台的 `source` 板块是搜不到任何 `code-server` 目录下的相关代码，只有存在于 `vscode` 的才能搜到
-   `vscode` 的 `websocket` 发送数据方法在 `browserSocketFactory.ts` 的 `send` 方法，可以 `console.log` 打印到控制台看看。可以用 `TextDecoder` 去解码数据，数据的加密也可以在这里处理
-   `vscode` 的 `websocket` 接收数据方法在 `browserSocketFactory.ts` 的 `_socketMessageListener` 方法，参数 `ev` 是 `Blob` 格式内容，并且这里是最先接收到 `code-server` 返回的内容，可以在这里解密
-   `ipc` 是进程之间的交互方式，
-   两个 `websocket` 中第一个是数据交互，第二个是用于心跳检测
-   `buffer.ts` 中定义了一个 `hasBuffer` 变量，用于判断是否有 `Buffer` 对象。（`window`下为`undefined`），然后对数据的格式进行对应的改变。在`node`环境下用`Buffer`，在`window`环境下使用`TextDecoder`

## 打包流程

-   code-sever >
-   yarn 安装依赖
-   yarn build 1.39.2 {codeservername}  名字随意取---这一步可以生成   /build/code-server{codeservername}-vsc1.39.2-linux-x86_64-built----------这一步非常花时间
-   node /path/to/output/build/out/vs/server/main.js	--这一步是跑demo---window下跑不了的
-   yarn binary 1.39.2 {codeservername} 	--打包二进制文件

## 参考文档

-   [code-server是如何把vscode搬到浏览器的](https://juejin.cn/post/6844904024005672968) 🚀
-   [vscode](https://github.com/microsoft/vscode) 🚀
-   [code-server](https://github.com/cdr/code-server) 🚀

## 其(chāo)他(dē)😅

-   下面应该是 `ipc` 之间交互的数据报文格式

```javascript
/**
 * A message has the following format:
 * ```
 *     /-------------------------------|------\
 *     |             HEADER            |      |
 *     |-------------------------------| DATA |
 *     | TYPE | ID | ACK | DATA_LENGTH |      |
 *     \-------------------------------|------/
 * ```
 * The header is 9 bytes and consists of:
 *  - TYPE is 1 byte (ProtocolMessageType) - the message type
 *  - ID is 4 bytes (u32be) - the message id (can be 0 to indicate to be ignored)
 *  - ACK is 4 bytes (u32be) - the acknowledged message id (can be 0 to indicate to be ignored)
 *  - DATA_LENGTH is 4 bytes (u32be) - the length in bytes of DATA
 *
 * Only Regular messages are counted, other messages are not counted, nor acknowledged.
 */
```

## 数据格式

### ipc.ts

路径：`E:\code\vscode\vscode\src\vs\base\parts\ipc\common\ipc.ts`
位置：`ChannelServer` 下的 `sendBuffer` 函数
作用：暂未确定功能
其他：`node` 环境，在服务端输出，不能用 `window` 对象
输出：

```javascript
console.log(`[ipc message send function:] -- ${new Date().getTime()}`);
console.log(message);

// 数据格式
r:{
	buffer: [],	// Uint8Array
	byteLength: 0
}
```

路径：`E:\code\vscode\vscode\src\vs\base\parts\ipc\common\ipc.ts`
位置：`ChannelClient` 下的 `sendBuffer` 函数
作用：暂未确定功能
其他：在客户端输出，但不能用 `window` 对象
输出：

```javascript
console.log(`[ipc message server send function:] -- ${new Date().getTime()}`);
console.log(message);

// 数据格式
s:{
	buffer: [],	// Uint8Array
	byteLength: 0
}
```

### ipc.net.ts

路径：`E:\code\vscode\vscode\src\vs\base\parts\ipc\node\ipc.net.ts`
位置：`WebSocketNodeSocket` 下的 `_acceptChunk` 函数 -- `this.socket.onData(data => this._acceptChunk(data))`
作用：可能是服务端接收到ws传输的数据之后的处理函数
其他：node环境，在服务端输出，不能用 `window` 对象
问题：node 下没有 TextDecoder 对象？
输出：

```javascript
console.log(`[_acceptChunk normal start:] -- ${new Date().getTime()}`);
console.log(this._incomingData.read(this._incomingData.byteLength));

// 数据格式
r:{
	buffer: [],	// Uint8Array
	byteLength: 0
}
```

# 研(kàn)究(kàn) 👨‍💻vscode 中的 websocket

## 前言

因项目要求，要对 `vscode` 的 `websocket` 传输的数据进行加密。由于对 `ts` 和 `node` 不够熟悉，在撞破了几个脑袋之后，记录下自己的一些理解。

`vscode` 是基于 `typescript` 和 `node` (桌面版：`electron`)，在看下面的内容前，建议提前了解一下 `Buffer、ArrayBuffer、TypedArray` 以及位运算等，会更加容易理解

## 打包流程

-   环境选择：Ubuntu、debian
-   进入项目根目录 `code-sever >`
-   执行 `yarn` 安装依赖
-   打包 `yarn build 1.39.2 { codeservername }` 名字随意取，这一步将生成 `/build/code-server{ codeservername }-vsc1.39.2-linux-x86_64-built` （比较花时间）
-   执行 `node /path/to/output/build/out/vs/server/main.js` 这一步是跑 demo，但注意 **window 下跑不了的**
-   执行 `yarn binary 1.39.2 { codeservername }` 打包二进制文件
-   执行打包好的二进制文件即可访问

## 关键代码解析

### browserSocketFactory.ts

路径：[browserSocketFactory.ts](https://github.com/microsoft/vscode/tree/master/src/vs/base/) 🚀 -- `BrowserWebSocket` 下的 `send` 函数  
功能：vscode 客户端发送数据的出入口  
分析：

```typescript
class BrowserWebSocket extends Disposable implements IWebSocket {
	// 这里new一个事件触发器，包含fire方法
	// The Emitter can be used to expose an Event to the public to fire it from the insides.
	// 引用自 event.ts 的 Emitter 类
	// 这里主要是注册事件，并存在 this._store 中 this_store 是 DisposableStore 对象数据
	private readonly _onData = new Emitter<ArrayBuffer>()
	public readonly onData = this._onData.event

	public readonly onOpen: Event<void>

	private readonly _onClose = this._register(new Emitter<void>())
	public readonly onClose = this._onClose.event

	private readonly _onError = this._register(new Emitter<any>())
	public readonly onError = this._onError.event

	private readonly _socket: WebSocket
	private readonly _fileReader: FileReader
	private readonly _queue: Blob[]
	private _isReading: boolean
	private _isClosed: boolean

	private readonly _socketMessageListener: (ev: MessageEvent) => void

	constructor(socket: WebSocket) {
		super()
		this._socket = socket
		this._fileReader = new FileReader()
		this._queue = []
		this._isReading = false
		this._isClosed = false

		this._fileReader.onload = event => {
			this._isReading = false
			const buff = <ArrayBuffer>(<any>event.target).result

			this._onData.fire(buff)

			if (this._queue.length > 0) {
				enqueue(this._queue.shift()!)
			}
		}

		const enqueue = (blob: Blob) => {
			if (this._isReading) {
				this._queue.push(blob)
				return
			}
			this._isReading = true
			this._fileReader.readAsArrayBuffer(blob)
		}

		this._socketMessageListener = (ev: MessageEvent) => {
			enqueue(<Blob>ev.data)
		}
		this._socket.addEventListener("message", this._socketMessageListener)

		this.onOpen = Event.fromDOMEventEmitter(this._socket, "open")

		let pendingErrorEvent: any | null = null

		const sendPendingErrorNow = () => {
			const err = pendingErrorEvent
			pendingErrorEvent = null
			this._onError.fire(err)
		}

		const errorRunner = this._register(new RunOnceScheduler(sendPendingErrorNow, 0))

		const sendErrorSoon = (err: any) => {
			errorRunner.cancel()
			pendingErrorEvent = err
			errorRunner.schedule()
		}

		const sendErrorNow = (err: any) => {
			errorRunner.cancel()
			pendingErrorEvent = err
			sendPendingErrorNow()
		}

		this._register(
			dom.addDisposableListener(this._socket, "close", (e: CloseEvent) => {
				this._isClosed = true

				if (pendingErrorEvent) {
					if (!window.navigator.onLine) {
						// The browser is offline => this is a temporary error which might resolve itself
						sendErrorNow(new RemoteAuthorityResolverError("Browser is offline", RemoteAuthorityResolverErrorCode.TemporarilyNotAvailable, e))
					} else {
						// An error event is pending
						// The browser appears to be online...
						if (!e.wasClean) {
							// Let's be optimistic and hope that perhaps the server could not be reached or something
							sendErrorNow(new RemoteAuthorityResolverError(e.reason || `WebSocket close with status code ${e.code}`, RemoteAuthorityResolverErrorCode.TemporarilyNotAvailable, e))
						} else {
							// this was a clean close => send existing error
							errorRunner.cancel()
							sendPendingErrorNow()
						}
					}
				}

				this._onClose.fire()
			})
		)

		this._register(dom.addDisposableListener(this._socket, "error", sendErrorSoon))
	}

	send(data: ArrayBuffer | ArrayBufferView): void {
		if (this._isClosed) {
			// Refuse to write data to closed WebSocket...
			return
		}
		this._socket.send(data)
	}

	close(): void {
		this._isClosed = true
		this._socket.close()
		this._socket.removeEventListener("message", this._socketMessageListener)
		this.dispose()
	}
}
```

<!-- ### ipc.ts

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
作用：发送的是文件状态如：write、open、close、stat、publicLog2、getExtensionsReport、getInstalled 等，具体用途暂未清楚
其他：在客户端输出，但不能用 `window` 对象
输出：

```javascript
const reader = new BufferReader(message);
console.log(`[ChannelClient sendBuffer]: -- ${new Date().getTime()}`);
console.log(deserialize(reader));

// 初始数据格式
s:{
	buffer: [],	// Uint8Array
	byteLength: 0
}

// deserialize ==>
// (4) [100, 488, "remotefilesystem", "write"]
``` -->

### ipc.net.ts

路径：[ipc.net.ts](https://github.com/microsoft/vscode/tree/master/src/vs/base/parts/ipc/node/ipc.net.ts) 🚀 -- `WebSocketNodeSocket` 下的 `_acceptChunk` 函数（`this.socket.onData(data => this._acceptChunk(data))`）  
功能：初步确认是服务端接收 ws 传输的数据之后的处理函数  
分析：

```typescript
private _acceptChunk(data: VSBuffer): void {
	if (data.byteLength === 0) {
		return;
	}
	this._incomingData.acceptChunk(data);
	// 定义的 chunkNum 类型数据，以 VSBuffer[] 形式存储所有接收到的数据
	while (this._incomingData.byteLength >= this._state.readLen) {
		// 只要 _incomingData 的字节长度大于最小头部长度（即2）时，遍历读数据
		// 下面的判断条件是为了限制读取顺序：确认头部信息-> 提取头部信息 -> 提取data数据
		if (this._state.state === ReadState.PeekHeader) {
			// chunkNum 类型方法，peek 是读取数据的方法，开始读取最小头部长度的数据（读2位数据）
			const peekHeader = this._incomingData.peek(this._state.readLen);
			// secondByte 为第二字节数据，readUInt8 是指读取第 offset 位的无符号的8位整数值
			// 可以参考nodejs api中文文档：http://nodejs.cn/api/buffer.html
			const secondByte = peekHeader.readUInt8(1);
			// 将第二字节数据（最大为255）与 0b10000000 做 ‘与’ 的操作，然后右移七位得到一个 ‘标志数字’
			// secondByte 要转换成16进制再做 & 运算 （toString(16)）
			// 只要 secondByte 超过127，那么 hasMask 为1， 否则为0
			const hasMask = (secondByte & 0b10000000) >>> 7;
			const len = (secondByte & 0b01111111);
			// 手动调整 _state 的数据，使进入下一个逻辑判断
			this._state.state = ReadState.ReadHeader;
			// 计算下一步读取数据的长度
			this._state.readLen = Constants.MinHeaderByteSize + (hasMask ? 4 : 0) + (len === 126 ? 2 : 0) + (len === 127 ? 8 : 0);
			this._state.mask = 0;
		} else if (this._state.state === ReadState.ReadHeader) {
			// read entire header
			// read 方法会修改源数据：取出 chunks（VSBuffer[]） 中的第一项数据 - shift()
			const header = this._incomingData.read(this._state.readLen);
			const secondByte = header.readUInt8(1);
			const hasMask = (secondByte & 0b10000000) >>> 7;
			let len = (secondByte & 0b01111111);

			let offset = 1;
			// 2 ** 8 是计算2的n次方
			if (len === 126) {
				// 读取header第二字节的数字,然后再 * 2 ** 8 + 第三字节的数字，计算出长度len
				len = (
					header.readUInt8(++offset) * 2 ** 8
					+ header.readUInt8(++offset)
				);
			} else if (len === 127) {
				// 同上
				len = (
					header.readUInt8(++offset) * 0
					+ header.readUInt8(++offset) * 0
					+ header.readUInt8(++offset) * 0
					+ header.readUInt8(++offset) * 0
					+ header.readUInt8(++offset) * 2 ** 24
					+ header.readUInt8(++offset) * 2 ** 16
					+ header.readUInt8(++offset) * 2 ** 8
					+ header.readUInt8(++offset)
				);
			}
			let mask = 0;
			if (hasMask) {
				// 计算完len之后，offset递增，再计算mask
				mask = (
					header.readUInt8(++offset) * 2 ** 24
					+ header.readUInt8(++offset) * 2 ** 16
					+ header.readUInt8(++offset) * 2 ** 8
					+ header.readUInt8(++offset)
				);
			}
			// 这里同样设置一个定值，用于下一步的逻辑判断，使之进入下一阶段处理
			this._state.state = ReadState.ReadBody;
			// 存储下一步读取数据的长度
			this._state.readLen = len;
			this._state.mask = mask;
		} else if (this._state.state === ReadState.ReadBody) {
			// 同样是 shift() 数组中的第一项存储在 body
			// 到这里的 VSBuffer 还不是最终的可以转换的数据
			const body = this._incomingData.read(this._state.readLen);
			// 这里执行 unmask方法，最终的数据在这个方法体可以拿到
			unmask(body, this._state.mask);
			// 恢复 _state 为开始的数据，重新开始新一轮数据的处理
			this._state.state = ReadState.PeekHeader;
			this._state.readLen = Constants.MinHeaderByteSize;
			this._state.mask = 0;
			// TODO: fire的作用？类似触发所有关联事件？
			this._onData.fire(body);
		}
	}
}

// 位置：WebSocketNodeSocket 类
private readonly _state = {
	state: ReadState.PeekHeader,	// eNum类型数据
	readLen: Constants.MinHeaderByteSize,	// 最小头部长度
	mask: 0	// 标志位
};

// ChunkStream class
// 位置： https://github.com/microsoft/vscode/tree/master/src/vs/base/parts/ipc/common/ipc.net.ts
export class ChunkStream {
	// 相当于 Buffer 数组
	private _chunks: VSBuffer[]
	// 字节长度
	private _totalLength: number

	public get byteLength() {
		// 获取字节长度
		return this._totalLength
	}

	constructor() {
		this._chunks = []
		this._totalLength = 0
	}

	public acceptChunk(buff: VSBuffer) {
		// 缓冲接收到的 buffer，存在数组里 _chunks
		this._chunks.push(buff)
		this._totalLength += buff.byteLength
	}

	public read(byteCount: number): VSBuffer {
		// 读取并截取第一项数据，会改变源 Buffer
		return this._read(byteCount, true)
	}

	public peek(byteCount: number): VSBuffer {
		// 仅读取第一项数据，不改变源 Buffer
		return this._read(byteCount, false)
	}

	private _read(byteCount: number, advance: boolean): VSBuffer {
		// 实际执行读取操作的函数，根据字节长度区分不同处理方法
		// 先处理边界情况
		if (byteCount === 0) {
			return getEmptyBuffer()
		}

		if (byteCount > this._totalLength) {
			// 将读取的长度超过总长，会报错
			throw new Error(`Cannot read so many bytes!`)
		}

		if (this._chunks[0].byteLength === byteCount) {
			// super fast path, precisely first chunk must be returned
			// 取第一项数据
			const result = this._chunks[0]
			if (advance) {
				// shift 掉第一项数据
				this._chunks.shift()
				// 同时修改总长
				this._totalLength -= byteCount
			}
			return result
		}

		if (this._chunks[0].byteLength > byteCount) {
			// fast path, the reading is entirely within the first chunk
			// 如果第一项数据长度超过要读取的字节长度，那么只需要读 byteCount 长度的数据
			const result = this._chunks[0].slice(0, byteCount)
			if (advance) {
				this._chunks[0] = this._chunks[0].slice(byteCount)
				this._totalLength -= byteCount
			}
			return result
		}

		// VSBuffer.alloc: 创建 byteCount 长的 Buffer 数据，并初始化每一项为0
		// TODO: 什么情况下会执行下面代码？
		let result = VSBuffer.alloc(byteCount)
		let resultOffset = 0
		let chunkIndex = 0
		while (byteCount > 0) {
			// 依旧是取第一项数据
			const chunk = this._chunks[chunkIndex]
			if (chunk.byteLength > byteCount) {
				// this chunk will survive
				const chunkPart = chunk.slice(0, byteCount)
				// result这里调用set方法，实际是调用 Uint8Array 的 set 方法。在 VSBuffer 内还是用的 Uint8Array 类型数据
				// 参考：https://github.com/microsoft/vscode/tree/master/src/vs/base/common/buffer.ts 中的 Buffer 类
				result.set(chunkPart, resultOffset)
				resultOffset += byteCount

				if (advance) {
					// 这里进行一次裁剪，超过byteCount长度的都被裁掉
					this._chunks[chunkIndex] = chunk.slice(byteCount)
					this._totalLength -= byteCount
				}

				byteCount -= byteCount
			} else {
				// 这里的处理 同上
				// this chunk will be entirely read
				result.set(chunk, resultOffset)
				resultOffset += chunk.byteLength

				if (advance) {
					this._chunks.shift()
					this._totalLength -= chunk.byteLength
				} else {
					chunkIndex++
				}

				byteCount -= chunk.byteLength
			}
		}
		// 注意这里返回的就是 VSBuffer 格式数据，可以直接调用 toString 方法 decode
		return result
	}
}
```

路径：[ipc.net.ts](https://github.com/microsoft/vscode/tree/master/src/vs/base/parts/ipc/node/ipc.net.ts) 🚀 -- `WebSocketNodeSocket` 下的 `write` 函数  
功能：初步确认是服务端发送 ws 的函数  
分析：

```typescript
// class WebSocketNodeSocket
public write(buffer: VSBuffer): void {
	// 初始化 headerLen 为最小头部长度
	let headerLen = Constants.MinHeaderByteSize;
	// 根据字节长度，确定 headerLen 的大小
	if (buffer.byteLength < 126) {
		headerLen += 0;
	} else if (buffer.byteLength < 2 ** 16) {
		headerLen += 2;
	} else {
		headerLen += 8;
	}
	// 创建 headerLen 长度的字节序列
	const header = VSBuffer.alloc(headerLen);
	// 第一位无符号整数修改为 0b10000010
	header.writeUInt8(0b10000010, 0);
	if (buffer.byteLength < 126) {
		header.writeUInt8(buffer.byteLength, 1);
	} else if (buffer.byteLength < 2 ** 16) {
		header.writeUInt8(126, 1);
		let offset = 1;
		header.writeUInt8((buffer.byteLength >>> 8) & 0b11111111, ++offset);
		header.writeUInt8((buffer.byteLength >>> 0) & 0b11111111, ++offset);
	} else {
		header.writeUInt8(127, 1);
		let offset = 1;
		header.writeUInt8(0, ++offset);
		header.writeUInt8(0, ++offset);
		header.writeUInt8(0, ++offset);
		header.writeUInt8(0, ++offset);
		header.writeUInt8((buffer.byteLength >>> 24) & 0b11111111, ++offset);
		header.writeUInt8((buffer.byteLength >>> 16) & 0b11111111, ++offset);
		header.writeUInt8((buffer.byteLength >>> 8) & 0b11111111, ++offset);
		header.writeUInt8((buffer.byteLength >>> 0) & 0b11111111, ++offset);
	}
	// 这里的 [header, buffer] 这种方式组成了 Blob 格式数据，具体可以查看【参考文档-Blob】
	// header 可以是 ArrayBuffer、TypedArray、blob、DOMString
	// Blob(blobParts[, options]) 返回一个新创建的 Blob 对象，其内容由参数中【给定的数组串联组成】
	this.socket.write(VSBuffer.concat([header, buffer]));
}
```

## 踩过的无底洞 🕳

-   修改的源码要确保不能出现错误如： tslint 提示语法错误的代码等
-   打包的 patch 文件一定要注意，编码是 **`UTF-8`**，且换行符的格式是：**`LF`**（默认是`CRLF`）
-   如果遇到 patch 失败问题，可以先试试清除服务器的缓存（重新 clone 项目代码），然后再重新执行 `yarn build`
    <!-- -   `websocket` 数据交互使用的是 **十六进制** 加密方式，可以用十六进制转字符串方法解码，也可以用 `TextDecoder` 解码 -->
-   注意 vscode 内部同时有 window 环境和 node 环境，要注意使用属性的兼容性，避免报错
-   运行过程中有时会一直重连，然后突然崩溃就一直连不上，具体什么原因不清楚
-   `trailing whitespace` 报错是指，代码最后一个字符必须以 ';' 结尾，否则会报错

## 猜测

-   `code-server` 基本依赖都是在 `vscode` 上，在浏览器控制台的 `source` 板块是搜不到任何 `code-server` 目录下的相关代码，只有存在于 `vscode` 的才能搜到
-   `vscode` 的 `websocket` 发送数据方法在 `browserSocketFactory.ts` 的 `send` 方法，可以 `console.log` 打印到控制台看看。可以用 `TextDecoder` 去解码数据，数据的加密也可以在这里处理
-   `vscode` 的 `websocket` 接收数据方法在 `browserSocketFactory.ts` 的 `_socketMessageListener` 方法，参数 `ev` 是 `Blob` 格式内容，并且这里是最先接收到 `code-server` 返回的内容，可以在这里解密
-   `ipc` 是进程之间的交互方式，
-   两个 `websocket` 中第一个主要是数据交互，第二个主要是用于心跳检测
-   `buffer.ts` 中定义了一个 `hasBuffer` 变量，用于判断是否有 `Buffer` 对象。（`window`下为`undefined`），然后对数据的格式进行对应的改变。在`node`环境下用`Buffer`，在`window`环境下使用`TextDecoder`

## 其他

-   下面应该是 `ipc` 之间交互的数据报文格式

````javascript
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
````

## 参考文档

-   [code-server 是如何把 vscode 搬到浏览器的](https://juejin.cn/post/6844904024005672968) 🚀
-   [vscode](https://github.com/microsoft/vscode) 🚀
-   [code-server](https://github.com/cdr/code-server) 🚀
-   [nodeJS](http://nodejs.cn/api/) 🚀
-   [ArrayBuffer](https://zh.javascript.info/arraybuffer-binary-arrays) 🚀
-   [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 🚀

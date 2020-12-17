# 技术分享--vscode 中 websocket 的研究

## 入席

-   首先先演示一遍 vscode 页面，及 websocket 数据交互演示。火狐浏览器下可以看到 websocket 传输的具体内容（明文）
-   因为有抓包工具的存在，可以通过抓包的方式看到 websocket 传输的数据，因此需要在这里增加一层加密
-   code-server 相当于 vscode 的服务端，当本地修改文件或执行其他操作时，都会产生 vscode 跟 code-server 的数据交互，并且 vscode 会同时在 browser 和 node 环境下运行

```javascript
git clone https://github.com/microsoft/vscode
cd vscode
git checkout ${vscodeVersion} // 我们目前用的是 1.39.2 版本，对应 code-server 是 2.1692-vsc1.39.2
yarn	// 安装依赖
export OUT=/path/to/output/build	// 指定输出路径
yarn build ${vscodeVersion} ${codeServerVersion}	// 执行打包，第一个是 vscode 版本，这里写1.39.2，第二个是打包后 code-server 的名字，这里可以随意填写
node /path/to/output/build/out/vs/server/main.js	// 执行node命令，就可以跑起来了
yarn binary ${vscodeVersion} ${codeServerVersion}	// 生成二进制文件
```

## 开胃菜

### Buffer 、 ArrayBuffer 、 TypedArray 、 Blob

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

### browserSocketFactory.ts

浏览器环境下的 websocket 构造函数，包含发送和接收数据的相关方法及数据处理逻辑等

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
	// 以上的方法感觉没怎么用到,这里写这些方法是因为 implements IWebSocket,因此在这里要全部实现一遍

	// 主要是这个 _socket 对象, WebSocket 类型
	private readonly _socket: WebSocket
	private readonly _fileReader: FileReader
	private readonly _queue: Blob[]
	private _isReading: boolean
	private _isClosed: boolean

	private readonly _socketMessageListener: (ev: MessageEvent) => void

	constructor(socket: WebSocket) {
		// 包含了一个构造函数,因此必须调用 super 方法,且需要在使用 this 之前调用
		// 在 es5 的继承中,一般是调用 call 来改变 this 指向问题
		// ES5继承是先创建子类的实例对象this，然后再将父类的方法添加到this上（apply）
		// class继承是先将父类的实例和方法添加到this上，然后再用子类的构造方法修改this（super）
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
			// 当 queue 还有数据的时候，继续执行
			if (this._queue.length > 0) {
				enqueue(this._queue.shift()!)
			}
		}

		const enqueue = (blob: Blob) => {
			// 这里创建了一个缓冲队列,在接收到websocket数据的时候,会先进入队列
			// 然后每完成一段数据的处理便shift()一段新的数据进行处理
			if (this._isReading) {
				this._queue.push(blob)
				return
			}
			this._isReading = true
			// 这里将收到的 Blob 数据转换成 ArrayBuffer
			this._fileReader.readAsArrayBuffer(blob)
		}

		this._socketMessageListener = (ev: MessageEvent) => {
			// 这里接收到的数据格式是:MessageEvent
			enqueue(<Blob>ev.data)
		}
		// websocket 的 message 事件，接收服务端传回来的数据
		this._socket.addEventListener("message", this._socketMessageListener)
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

// IWebSocket 接口
export interface IWebSocket {
	readonly onData: Event<ArrayBuffer>
	readonly onOpen: Event<void>
	readonly onClose: Event<void>
	readonly onError: Event<any>

	send(data: ArrayBuffer | ArrayBufferView): void
	close(): void
}
```

### ipc.net.ts

```typescript
export class WebSocketNodeSocket extends Disposable implements ISocket {
	public readonly socket: NodeSocket
	private readonly _incomingData: ChunkStream
	private readonly _onData = this._register(new Emitter<VSBuffer>())

	private readonly _state = {
		state: ReadState.PeekHeader,
		readLen: Constants.MinHeaderByteSize,
		mask: 0
	}

	constructor(socket: NodeSocket) {
		super()
		this.socket = socket
		this._incomingData = new ChunkStream()
		this._register(this.socket.onData(data => this._acceptChunk(data)))
	}

	public dispose(): void {
		this.socket.dispose()
	}

	public onData(listener: (e: VSBuffer) => void): IDisposable {
		return this._onData.event(listener)
	}

	public onClose(listener: () => void): IDisposable {
		return this.socket.onClose(listener)
	}

	public onEnd(listener: () => void): IDisposable {
		return this.socket.onEnd(listener)
	}

	public write(buffer: VSBuffer): void {
		// 初始化 headerLen 为最小头部长度
		let headerLen = Constants.MinHeaderByteSize
		// 根据字节长度，确定 headerLen 的大小
		if (buffer.byteLength < 126) {
			headerLen += 0
		} else if (buffer.byteLength < 2 ** 16) {
			headerLen += 2
		} else {
			headerLen += 8
		}
		// 创建 headerLen 长度的字节序列
		const header = VSBuffer.alloc(headerLen)
		// 第一位无符号整数修改为 0b10000010  == 130
		header.writeUInt8(0b10000010, 0)
		if (buffer.byteLength < 126) {
			// 确定第二字节的值
			header.writeUInt8(buffer.byteLength, 1)
		} else if (buffer.byteLength < 2 ** 16) {
			header.writeUInt8(126, 1)
			let offset = 1
			header.writeUInt8((buffer.byteLength >>> 8) & 0b11111111, ++offset)
			header.writeUInt8((buffer.byteLength >>> 0) & 0b11111111, ++offset)
		} else {
			header.writeUInt8(127, 1)
			let offset = 1
			header.writeUInt8(0, ++offset)
			header.writeUInt8(0, ++offset)
			header.writeUInt8(0, ++offset)
			header.writeUInt8(0, ++offset)
			// buffer.byteLength 换成二进制，无符号右移后执行与操作
			// 目的是取如超过 2**24 之后的数据
			header.writeUInt8((buffer.byteLength >>> 24) & 0b11111111, ++offset)
			header.writeUInt8((buffer.byteLength >>> 16) & 0b11111111, ++offset)
			header.writeUInt8((buffer.byteLength >>> 8) & 0b11111111, ++offset)
			header.writeUInt8((buffer.byteLength >>> 0) & 0b11111111, ++offset)
		}
		// 这里返回的数据时 VSBuffer，但实际上客户端接收到的是 MessageEvent 格式数据，包含其他如：ws来源信息等
		// 数据都存在 e.data 内，并且 MessageEvent 的格式为 Blob 数据
		this.socket.write(VSBuffer.concat([header, buffer]))
	}

	public end(): void {
		this.socket.end()
	}

	private _acceptChunk(data: VSBuffer): void {
		if (data.byteLength === 0) {
			return
		}

		this._incomingData.acceptChunk(data)
		// 定义的 chunkNum 类型数据，以 VSBuffer[] 形式存储所有接收到的数据
		while (this._incomingData.byteLength >= this._state.readLen) {
			// 只要 _incomingData 的字节长度大于最小头部长度（即2）时，遍历读数据
			// 下面的判断条件是为了限制读取顺序：确认头部信息-> 提取头部信息 -> 提取data数据
			if (this._state.state === ReadState.PeekHeader) {
				// chunkNum 类型方法，peek 是读取数据的方法，开始读取最小头部长度的数据（读2位数据）
				const peekHeader = this._incomingData.peek(this._state.readLen)
				// secondByte 为第二字节数据，readUInt8 是指读取第 offset 位的无符号的8位整数值
				// 可以参考nodejs api中文文档：http://nodejs.cn/api/buffer.html
				const secondByte = peekHeader.readUInt8(1)
				// 将第二字节数据（最大为255）与 0b10000000 做 ‘与’ 的操作，然后右移七位得到一个 ‘标志数字’
				// 这个标志数字为mask，也就是 websocket 中的掩码，主要针对安全方面的优化，避免被中间设备攻击
				// 这一项仅可以在客户端设置，如果在服务端设置了会报错：只有客户端发送的数据才需要掩码处理
				const hasMask = (secondByte & 0b10000000) >>> 7
				const len = secondByte & 0b01111111
				// 手动调整 _state 的数据，使进入下一个逻辑判断
				this._state.state = ReadState.ReadHeader
				// 计算下一步读取数据的长度
				this._state.readLen = Constants.MinHeaderByteSize + (hasMask ? 4 : 0) + (len === 126 ? 2 : 0) + (len === 127 ? 8 : 0)
				this._state.mask = 0
			} else if (this._state.state === ReadState.ReadHeader) {
				// read entire header
				// read 方法会修改源数据：取出 chunks（VSBuffer[]） 中的第一项数据 - shift()
				const header = this._incomingData.read(this._state.readLen)
				const secondByte = header.readUInt8(1)
				const hasMask = (secondByte & 0b10000000) >>> 7
				let len = secondByte & 0b01111111

				let offset = 1
				// 2 ** 8 是计算2的n次方
				if (len === 126) {
					// 读取header第二字节的数字,然后再 * 2 ** 8 + 第三字节的数字，计算出长度len
					len = header.readUInt8(++offset) * 2 ** 8 + header.readUInt8(++offset)
				} else if (len === 127) {
					// 同上
					len = header.readUInt8(++offset) * 0 + header.readUInt8(++offset) * 0 + header.readUInt8(++offset) * 0 + header.readUInt8(++offset) * 0 + header.readUInt8(++offset) * 2 ** 24 + header.readUInt8(++offset) * 2 ** 16 + header.readUInt8(++offset) * 2 ** 8 + header.readUInt8(++offset)
				}
				let mask = 0
				if (hasMask) {
					// 计算完len之后，offset递增，再计算mask
					mask = header.readUInt8(++offset) * 2 ** 24 + header.readUInt8(++offset) * 2 ** 16 + header.readUInt8(++offset) * 2 ** 8 + header.readUInt8(++offset)
				}
				// 这里同样设置一个定值，用于下一步的逻辑判断，使之进入下一阶段处理
				this._state.state = ReadState.ReadBody
				// 存储下一步读取数据的长度
				this._state.readLen = len
				this._state.mask = mask
			} else if (this._state.state === ReadState.ReadBody) {
				// 同样是 shift() 数组中的第一项存储在 body
				// 到这里的 VSBuffer 还不是最终的可以转换的数据
				const body = this._incomingData.read(this._state.readLen)
				// 这里执行 unmask方法，最终的数据在这个方法体可以拿到
				unmask(body, this._state.mask)
				// 恢复 _state 为开始的数据，重新开始新一轮数据的处理
				this._state.state = ReadState.PeekHeader
				this._state.readLen = Constants.MinHeaderByteSize
				this._state.mask = 0
				// TODO: fire的作用？类似触发所有关联事件？
				this._onData.fire(body)
			}
		}
	}
}

function unmask(buffer: VSBuffer, mask: number): void {
	if (mask === 0) {
		return
	}
	let cnt = buffer.byteLength >>> 2
	for (let i = 0; i < cnt; i++) {
		const v = buffer.readUInt32BE(i * 4)
		buffer.writeUInt32BE(v ^ mask, i * 4)
	}
	let offset = cnt * 4
	let bytesLeft = buffer.byteLength - offset
	const m3 = (mask >>> 24) & 0b11111111
	const m2 = (mask >>> 16) & 0b11111111
	const m1 = (mask >>> 8) & 0b11111111
	if (bytesLeft >= 1) {
		buffer.writeUInt8(buffer.readUInt8(offset) ^ m3, offset)
	}
	if (bytesLeft >= 2) {
		buffer.writeUInt8(buffer.readUInt8(offset + 1) ^ m2, offset + 1)
	}
	if (bytesLeft >= 3) {
		buffer.writeUInt8(buffer.readUInt8(offset + 2) ^ m1, offset + 2)
	}
}
```

### ChunkStream class

```typescript
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

## 饭后甜点

### 蛋糕

-   修改的源码要确保不能出现错误如： tslint 提示语法错误的代码等
-   打包的 patch 文件一定要注意，编码是 **`UTF-8`**，且换行符的格式是：**`LF`**（默认是`CRLF`）
-   如果遇到 patch 失败问题，可以先试试清除服务器的缓存（重新 clone 项目代码），然后再重新执行 `yarn build`
-   注意 vscode 内部同时有浏览器环境和 node 环境，要注意使用属性的兼容性，避免报错
-   运行过程中有时会一直重连，然后突然崩溃就一直连不上，具体什么原因不清楚
-   `trailing whitespace` 报错是指，代码最后一个字符必须以 ';' 结尾，否则会报错（可以试试 `--whitespace=fix`）

### 水果

-   `code-server` 基本依赖都是在 `vscode` 上，在浏览器控制台的 `source` 板块是搜不到任何 `code-server` 目录下的相关代码，只有存在于 `vscode` 的才能搜到
-   `ipc` 是进程之间的交互方式，
-   两个 `websocket` 中第一个主要是数据交互，第二个主要是用于心跳检测

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

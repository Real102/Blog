# Puppeteer

`Puppeteer` 是一个 `Node` 库，它提供了一个高级 `API` 来通过 `DevTools` 协议控制 `Chromium` 或 `Chrome`。

`Puppeteer API` 概览

## puppeteer

- `puppeteer.connect(options)` -- 将 `puppeteer` 添加到已有的 `chromium` 实例
- `puppeteer.createBrowserFetcher([options])`
- `puppeteer.defaultArgs([options])` -- `chromium` 启动时使用的默认参数
- `puppeteer.executablePath()` -- 查询绑定的 `chromium` 路径
- `puppeteer.launch([options])` -- 使用 defaultArgs 默认值启动 `chromium` 及通过 executablePath 等管理它的进程，然后生成一个 `browser` 实例并初始化

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-puppeteer)

## Browser

Events

- `browser.on('disconnected')` -- pptr 断开连接时触发
- `browser.on('targetchanged')` -- 当 `url` 改变时触发
- `browser.on('targetcreated')` -- 当目标被创建时触发，如 `window.open`、`browser.newPage` 打开新页面
- `browser.on('targetdestroyed')` -- 当目标被销毁时被触发，例如当一个页面被关闭时

Methods

- `browser.browserContexts()` -- 返回一个包含所有打开的浏览器上下文数组，在新创建的浏览器中，这将返回 `browserContexts` 的单一实例
- `browser.close()` -- 关闭 `chromium` 及所有页面，`browser` 不能再被使用
- `browser.createIncognitoBrowserContext()` -- 创建匿名的浏览器上下文，且不分享 `cookies/cache`
- `browser.defaultBrowserContext()` -- 返回默认的浏览器上下文，且不能被关闭
- `browser.disconnect()` -- 断开连接，但 `chromium` 进程不关闭，且 `browser` 不能再被使用
- `browser.newPage()` -- 返回新的 `Page` 对象（开标签页）
- `browser.pages()` -- 返回浏览器中所有的页面
- `browser.process()` -- 产生浏览器的进程，如果是 `pptr.connect` 创建的则返回 `null`
- `browser.target()` -- 目标对象
- `browser.targets()` -- 所有活动目标
- `browser.userAgent()` -- 原始的 `ua`
- `browser.version()` -- 版本
- `browser.wsEndpoint()` -- 返回浏览器 `websocket` 地址

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-browser)

## Page

Events

- `page.on('close')`
- `page.on('console')` -- 调用了 `console` 的方法
- `page.on('dialog')` -- 对话框
- `page.on('domcontentloaded')`
- `page.on('error')`
- `page.on('frameattached')` -- `iframe` 加载时触发
- `page.on('framedetached')` -- `iframe` 移除时触发
- `page.on('framenavigated')` -- `iframe` 导航到新的 url 时触发
- `page.on('load')`
- `page.on('metrics')` -- 调用了 `console.timestamp` 时触发
- `page.on('pageerror')` -- 当发生页面 `js` 代码没有捕获的异常时触发
- `page.on('request')`
- `page.on('requestfailed')`
- `page.on('requestfinished')`
- `page.on('response')`
- `page.on('workercreated')` -- 当页面生成响应的 `webworker` 时触发
- `page.on('workerdestroyed')` -- 当页面终止响应的 `websocket` 时触发

Namespace

- `page.accessibility` -- 命名空间，返回 `Accessibility`
- `page.coverage` -- 命名空间，返回 `Coverage`
- `page.keyboard` -- 命名空间，返回 `Keyboard`
- `page.mouse` -- 命名空间，返回 `Mouse`
- `page.touchscreen` -- 命名空间，返回 `Touchscreen`
- `page.tracing` -- 命名空间，返回 `Tracing`

Methods

- `page.$(selector)` -- 相当于执行 `document.querySelector`
- `page.$$(selector)` -- 相当于执行 `document.querySelectorAll`
- `page.$$eval(selector, pageFunction[, ...args])` -- 执行 `Array.from(document.querySelectorAll(selector))`，并将结果传给 `pageFunction`
- `page.$eval(selector, pageFunction[, ...args])` -- 将选择到的第一个元素传给 `pageFunction`
- `page.$x(expression)` -- 解析指定的 `XPath` 表达式
- `page.addScriptTag(options)` -- 注入一个指定 `src` 或代码的 `script` 标签到当前页面
- `page.addStyleTag(options)` -- 注入样式
- `page.authenticate(credentials)` -- 认证凭据
- `page.bringToFront()` -- 切换到某个 `tab`
- `page.browser()` -- 当前 `page` 实例所属的 `browser` 实例
- `page.click(selector[, options])`
- `page.close([options])` -- 在 `beforeUnload` 前默认不执行
- `page.content()` - 返回页面完整的 `HTML` 代码
- `page.cookies([...urls])` -- 返回当前域名的 `cookie` 或返回指定 `url` 下的 `cookie`
- `page.deleteCookie(...cookies)`
- `page.emulate(options)` -- 根据指定的参数和 `ua` 生成模拟器
- `page.emulateMedia(mediaType)` -- 改变页面的 `css` 媒体类型
- `page.evaluate(pageFunction[, ...args])`
- `page.evaluateHandle(pageFunction[, ...args])`
- `page.evaluateOnNewDocument(pageFunction[, ...args])`
- `page.exposeFunction(name, puppeteerFunction)` -- 添加一个名为 `name` 的方法到 `window` 对象
- `page.focus(selector)` -- 聚焦与 `selector`
- `page.frames()` -- 返回所有的 `iframe` 标签
- `page.goBack([options])` -- 回退
- `page.goForward([options])` -- 前进
- `page.goto(url[, options])` -- 跳转到指定地址
- `page.hover(selector)` -- 指定元素 `hover`
- `page.isClosed()` -- 页面是否被关闭
- `page.mainFrame()` -- 保证页面一直有一个主 `iframe`
- `page.metrics()` -- 返回包含指标数据的键值对
- `page.pdf([options])` -- 生成当前页面的 `PDF`
- `page.queryObjects(prototypeHandle)` -- 遍历 `js` 对战，找到带有指定原型的对象
- `page.reload([options])`
- `page.screenshot([options])` -- 截图
- `page.select(selector, ...values)` -- 选择器
- `page.setBypassCSP(enabled)` -- 绕过页面的安全策略
- `page.setCacheEnabled([enabled])` -- 设置每个请求忽略缓存，默认是启用
- `page.setContent(html[, options])` -- 注入 `HTML`？
- `page.setCookie(...cookies)`
- `page.setDefaultNavigationTimeout(timeout)` -- 设置默认跳转等待时间
- `page.setExtraHTTPHeaders(headers)` -- 设置额外的 `http` 请求头
- `page.setGeolocation(options)` -- 设置坐标点
- `page.setJavaScriptEnabled(enabled)` -- 是否启用 `js`，下个页面会起作用
- `page.setOfflineMode(enabled)` -- 启用离线模式
- `page.setRequestInterception(value)` -- 请求拦截器
- `page.setUserAgent(userAgent)` -- 设置 `ua`
- `page.setViewport(viewport)` -- 设置 `viewport`
- `page.tap(selector)` -- 匹配 `selector`，滚动到可视区域并点击
- `page.target()`
- `page.title()`
- `page.type(selector, text[, options])` -- 输入内容
- `page.url()`
- `page.viewport()`
- `page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])` -- 等待
- `page.waitForFunction(pageFunction[, options[, ...args]])`
- `page.waitForNavigation([options])`
- `page.waitForRequest(urlOrPredicate[, options])`
- `page.waitForResponse(urlOrPredicate[, options])`
- `page.waitForSelector(selector[, options])`
- `page.waitForXPath(xpath[, options])` -- 等待 xPath 对应的元素出现
- `page.workers()` -- 返回与页面关联的 `webworkers`

## Worker

- `worker.evaluate(pageFunction, ...args)` -- 等待并解析返回的值
- `worker.evaluateHandle(pageFunction, ...args)`
- `worker.executionContext()`
- `worker.url()`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-worker)

## Accessibility

- `accessibility.snapshot([options])`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-accessibility)

## Keyboard

- `keyboard.down(key[, options])`
- `keyboard.press(key[, options])`
- `keyboard.sendCharacter(char)` -- 分发一个 `press` 和 `input` 事件，但不会发送 `keydown` 或 `keyup` 事件
- `keyboard.type(text, options)` -- 输入内容
- `keyboard.up(key)`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-keyboard)

## Mouse

- `mouse.click(x, y, [options])`
- `mouse.down([options])`
- `mouse.move(x, y, [options])` -- `mousemove` 事件
- `mouse.up([options])`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-mouse)

## Touchscreen

- `touchscreen.tap(x, y)` -- 触发 touchstart、touchend 事件

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-touchscreen)

## Tracing

- `tracing.start(options)` -- 跟踪
- `tracing.stop()`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-tracing)

## Dialog

- `dialog.accept([promptText])` -- 提示中输入的文本
- `dialog.defaultValue()` -- 如果对话框出现提示，返回默认值，否则返回空字符串
- `dialog.dismiss()`
- `dialog.message()` -- 显示在对话框中的信息
- `dialog.type()` -- 对话框类型

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-dialog)

## ConsoleMessage

- `consoleMessage.args()`
- `consoleMessage.text()`
- `consoleMessage.type()`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-consolemessage)

## Frame

- `frame.$(selector)`
- `frame.$$(selector)`
- `frame.$$eval(selector, pageFunction[, ...args])`
- `frame.$eval(selector, pageFunction[, ...args])`
- `frame.\$x(expression)`
- `frame.addScriptTag(options)`
- `frame.addStyleTag(options)`
- `frame.childFrames()`
- `frame.click(selector[, options])`
- `frame.content()`
- `frame.evaluate(pageFunction, ...args)`
- `frame.evaluateHandle(pageFunction, ...args)`
- `frame.executionContext()`
- `frame.focus(selector)`
- `frame.goto(url, options)`
- `frame.hover(selector)`
- `frame.isDetached()`
- `frame.name()`
- `frame.parentFrame()`
- `frame.select(selector, ...values)`
- `frame.setContent(html)`
- `frame.tap(selector)`
- `frame.title()`
- `frame.type(selector, text[, options])`
- `frame.url()`
- `frame.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])`
- `frame.waitForFunction(pageFunction[, options[, ...args]])`
- `frame.waitForNavigation(options)`
- `frame.waitForSelector(selector[, options])`
- `frame.waitForXPath(xpath[, options])`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-frame)

## ExecutionContext

- `executionContext.evaluate(pageFunction, ...args)`
- `executionContext.evaluateHandle(pageFunction, ...args)`
- `executionContext.frame()`
- `executionContext.queryObjects(prototypeHandle)`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-ExecutionContext)

## JSHandle

- `jsHandle.asElement()`
- `jsHandle.dispose()`
- `jsHandle.executionContext()`
- `jsHandle.getProperties()`
- `jsHandle.getProperty(propertyName)`
- `jsHandle.jsonValue()`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-JSHandle)

## ElementHandle

- `elementHandle.$(selector)`
- `elementHandle.$$(selector)`
- `elementHandle.$eval(selector, pageFunction, ...args)`
- `elementHandle.$$eval(selector, pageFunction, ...args)`
- `elementHandle.$x(expression)`
- `elementHandle.asElement()`
- `elementHandle.boundingBox()`
- `elementHandle.boxModel()`
- `elementHandle.click([options])`
- `elementHandle.contentFrame()`
- `elementHandle.dispose()`
- `elementHandle.executionContext()`
- `elementHandle.focus()`
- `elementHandle.getProperties()`
- `elementHandle.getProperty(propertyName)`
- `elementHandle.hover()`
- `elementHandle.isIntersectingViewport()`
- `elementHandle.jsonValue()`
- `elementHandle.press(key[, options])`
- `elementHandle.screenshot([options])`
- `elementHandle.tap()`
- `elementHandle.toString()`
- `elementHandle.type(text[, options])`
- `elementHandle.uploadFile(...filePaths)`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-ElementHandle)

## Request

- `request.abort([errorCode])`
- `request.continue([overrides])`
- `request.failure()`
- `request.frame()`
- `request.headers()`
- `request.isNavigationRequest()`
- `request.method()`
- `request.postData()`
- `request.redirectChain()`
- `request.resourceType()`
- `request.respond(response)`
- `request.response()`
- `request.url()`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-Request)

## Response

- `response.buffer()`
- `response.frame()`
- `response.fromCache()`
- `response.fromServiceWorker()`
- `response.headers()`
- `response.json()`
- `response.ok()`
- `response.remoteAddress()`
- `response.request()`
- `response.securityDetails()`
- `response.status()`
- `response.statusText()`
- `response.text()`
- `response.url()`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-Response)

## SecurityDetails

- `securityDetails.issuer()`
- `securityDetails.protocol()`
- `securityDetails.subjectName()`
- `securityDetails.validFrom()`
- `securityDetails.validTo()`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-SecurityDetails)

## Target

- `target.browser()`
- `target.browserContext()`
- `target.createCDPSession()`
- `target.opener()`
- `target.page()`
- `target.type()`
- `target.url()`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-Target)

## CDPSession

- `cdpSession.detach()`
- `cdpSession.send(method[, params])`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-CDPSession)

## Coverage

- `coverage.startCSSCoverage(options)`
- `coverage.startJSCoverage(options)`
- `coverage.stopCSSCoverage()`
- `coverage.stopJSCoverage()`

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-Coverage)

## TimeoutError

某些操作因超时而终止时，就会触发

[源文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.6.0&show=api-class-TimeoutError)

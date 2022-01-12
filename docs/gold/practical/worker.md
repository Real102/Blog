# 【实用篇】在 vue 中使用 web worker

1. 直接绝对路径引用 worker，引出随意放置 worker 位置
2. 解决引用时发现 MIME 类型错误问题
3. 发现 worker-loader 的妙用
4. 解决 importScript 引入文件报 MIME 类型错误问题
5. 发现 This loader registers the script as Web Worker
6. 当做普通 js 文件写代码
7. 最终解决问题

参考文档：<https://www.webpackjs.com/loaders/worker-loader/>

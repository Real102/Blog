const path = require("path")
module.exports = {
  base: "/Blog/",
  title: "WolfBerry",
  description: "WolfBerry's Blog",
  port: "9999",
  openPage: true,
  themeConfig: {
    nav: [
      // 顶部导航配置
      { text: "Blog", link: "/blog/" },
      { text: "Ugly", link: "/ugly/" },
      { text: "Gold", link: "/gold/" },
      { text: "Diary", link: "/diary/" }
    ],
    locales: {
      // 为什么是locales？区分语言？如果是单语言情况下，需要怎么设置侧边栏？
      "/": {
        sidebar: {
          // 侧边栏配置
          "/blog/": getBlogSideBar(),
          "/ugly/": getUglySideBar(),
          "/gold/": getGoldSideBar(),
          "/diary/": getDiarySideBar()
        }
      }
    },
    smoothScroll: true,
    sidebar: "auto", // 自动把当前页面的header当做侧边栏链接
    lastUpdated: "Last Updated", // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    repo: "Real102/Blog", // 设置仓库地址，可以是完整地址也可以是相对地址
    editLinks: true, // 默认是 false, 设置为 true 来启用
    editLinkText: "Edit in GitHub", // 默认为 "Edit this page"
    docsDir: "docs" // 假如文档不是放在仓库的根目录下，这里一般需要配置目标路径
  },
  configureWebpack: {
    resolve: {
      alias: {
        // 需要用path.resolve，直接用相对路径或绝对路径会解析失败
        "@imgs": path.resolve(__dirname, "./public/img")
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 10240 }))
      .end()
  }
}

function getBlogSideBar() {
  // 参考快速引入方法，无需逐个添加
  // https://github.com/vuejs/vuepress/blob/2fbad2867deaa21240a4e2339e1d63bce7ef20b4/packages/docs/docs/.vuepress/config.js#L140
  return [
    {
      title: "博客", // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [["", "介绍"]]
    },
    {
      title: "HTML",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ["html/meta", "常用的meta标签"],
        ["html/unicode", "字符编码"],
        ["html/font", "【字体压缩】淦，以后不用怕字体文件了"],
        ["html/vh", "vh 高度问题"],
        ["html/scss", "scss 常见用法"]
      ]
    },
    {
      title: "Javascript",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ["javascript/get-image-size", "限制上传图片的尺寸"],
        ["javascript/preload-image", "图片预加载"],
        ["javascript/lazyload", "图片懒加载的两种实现方式"],
        ["javascript/encryption", "常用的加密方案及相关实现代码"]
      ]
    },
    {
      title: "Typescript",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ["typescript/practice", "TS练习题"],
        ["typescript/extends", "TS 中的 extends 关键字"],
        ["typescript/built-in", "TS 常用内置类型"]
      ]
    },
    {
      title: "Vue",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ["vue/img-in-vue", "在vue项目中引入图片"],
        ["vue/vue-env", "vue 环境变量的设置与使用"],
        ["vue/decorator", "Vue Property Decorator"],
        ["vue/wechat-auth", "微信 JS-SDK 实现自定义分享功能"]
      ]
    },
    {
      title: "Webpack",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ["webpack/require-context", "require.context 的妙用"],
        ["webpack/lodash", "lodash 按需引入及打包优化"]
      ]
    },
    {
      title: "工具/插件",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ["plugin/rrweb", "rrweb -- 录制并回放web界面用户操作"],
        ["plugin/puppeteer", "Puppeteer"]
      ]
    },
    {
      title: "移动端",
      collapsable: false,
      sidebarDepth: 1,
      children: [["mobile/preview-on-mobile", "手机端预览vue项目"]]
    },
    {
      title: "其他",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ["others/onlineTime", "用户在线时长统计方案思考"],
        ["others/test-unit", "单元测试"],
        ["others/quickapp", "快应用的填坑日志"],
        ["others/miniApp", "小程序探究"],
        ["others/nvm", "使用 nvm 来管理 npm"],
        ["others/vscode-for-web", "搭建 web 版 vs code"],
        ["others/ws-in-vscode", "研究vscode中的websocket"],
        ["others/format-phone", "手机号输入框的格式化显示"],
        ["others/data-type", "数据类型与转换"]
      ]
    }
  ]
}

function getUglySideBar() {
  return [
    {
      title: "Ugly", // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0, // 可选的, 默认值是 1
      children: [
        ["", "介绍"],
        ["2021.8", "2021.8"],
        ["2021.9", "2021.9"],
        ["2021.10", "2021.10"],
        ["2021.11", "2021.11"],
        ["2021.12", "2021.12"],
        ["2022.1", "2022.1"],
        ["2022.2", "2022.2"],
        ["2022.3", "2022.3"],
        ["2022.4", "2022.4"],
        ["2022.5", "2022.5"],
        ["2022.6", "2022.6"],
        ["2022.7", "2022.7"],
        ["2023.1", "2023.1"],
        ["2023.2", "2023.2"],
        // ["技术点", "技术点"],
        // ["ts类型", "ts类型"],
        ["测试用例", "测试用例"]
      ]
    }
  ]
}

function getGoldSideBar() {
  return [
    {
      title: "掘", // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [["", "介绍"]]
    },
    {
      title: "【已发】",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ["prev/fe-views", "摸鱼必看的前端知识点"],
        ["prev/splitChunk", "splitChunks 与 import 方式的化学反应"],
        ["prev/browser", "挖掘谷歌浏览器小工具"],
        ["prev/quickapp-css", "快应用样式"]
      ]
    },
    {
      title: "【待发】",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        ["next/worker", "在 vue 中使用 web worker"],
        ["next/software", "挖掘好用的PC软件"],
        ["next/plugins", "挖掘好用的前端插件"],
        ["next/quickapp-html", "快应用页面结构"]
      ]
    }
  ]
}

function getDiarySideBar() {
  return [
    {
      title: "Diary"
    }
  ]
}

// .vuepress/components/ 下的 *.vue 文件都会被注册成全局的异步组件

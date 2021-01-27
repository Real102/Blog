const path = require("path")
module.exports = {
	base: "/Blog/",
	title: "WolfBerry",
	description: "WolfBerry's Blog",
	port: "9999",
	themeConfig: {
		nav: [
			// 顶部导航配置
			{ text: "Blog", link: "/blog/" },
			{ text: "Demo", link: "/demo/" },
			{ text: "Diary", link: "/diary/" }
			// {
			// 	text: 'GitHub',
			// 	link: 'https://github.com/Real102',
			// 	target: '_blank',
			// 	rel: 'noopener noreferrer',
			// },
		],
		locales: {
			// 为什么是locales？区分语言？如果是单语言情况下，需要怎么设置侧边栏？
			"/": {
				sidebar: {
					// 侧边栏配置
					"/blog/": getBlogSideBar(),
					"/demo/": getDemoSideBar(),
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
				["html/unicode", "字符编码"]
			]
		},
		{
			title: "Javascript",
			collapsable: false,
			sidebarDepth: 1,
			children: [
				["javascript/get-image-size", "限制上传图片的尺寸"],
				["javascript/preload-image", "图片预加载"],
				["javascript/lazyload", "图片懒加载的两种实现方式"]
			]
		},
		{
			title: "Vue",
			collapsable: false,
			sidebarDepth: 1,
			children: [
				["vue/img-in-vue", "在vue项目中引入图片"],
				["vue/vue-env", "vue 环境变量的设置与使用"]
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
				["others/nvm", "使用 nvm 来管理 npm"],
				["others/vscode-for-web", "搭建 web 版 vs code"],
				["others/ws-in-vscode", "研究vscode中的websocket"],
				["others/format-phone", "手机号输入框的格式化显示"],
				["others/data-type", "数据类型与转换"]
			]
		}
	]
}

function getDemoSideBar() {
	return [
		{
			title: "Demo", // 必要的
			collapsable: false, // 可选的, 默认值是 true,
			sidebarDepth: 1, // 可选的, 默认值是 1
			children: [
				["", "介绍"],
				["page1", "测试1"],
				["page2", "测试2"]
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

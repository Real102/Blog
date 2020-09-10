module.exports = {
    title: "WolfBerry",
    description: "WolfBerry's Blob",
    themeConfig: {
        nav: [
            // 顶部导航配置
            { text: "Blob", link: "/blob/" },
            { text: "Demo", link: "/demo/" },
            {
                text: "GitHub",
                link: "https://github.com/Real102",
                target: "_blank",
                rel: "noopener noreferrer",
            },
        ],
        locales: {
            // 为什么是locales？区分语言？如果是单语言情况下，需要怎么设置侧边栏？
            "/": {
                sidebar: {
                    // 侧边栏配置
                    "/blob/": getBlobSideBar(),
                    "/demo/": getDemoSideBar(),
                },
            },
        },
        smoothScroll: true,
        sidebar: "auto", // 自动把当前页面的header当做侧边栏链接
        lastUpdated: "Last Updated", // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@imgs": "./public/img",
            },
        },
    },
}

function getBlobSideBar() {
    return [
        {
            title: "博客", // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 1, // 可选的, 默认值是 1
            children: [
                ["", "介绍"],
                ["vscode-for-web", "搭建 web 版 vs code"],
                ["get-image-size", "限制上传图片的尺寸"],
            ],
        },
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
                ["page1", "测试页面1"],
                ["page2", "测试页面2"],
            ],
        },
    ]
}

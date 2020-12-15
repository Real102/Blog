# 手机端预览 vue 项目

使用 vue 开发移动端项目的时候，经常需要在手机上看效果，查了下资料发现可以通过以下方式达到真机预览效果

## 同一局域网

首先要确保电脑跟手机是处于同一个局域网内，即连接同一个 WiFi

## 设置 host

打开 `vue.config.js` 设置 `host` 为 `'0.0.0.0'`

![vue.config.js](https://github.com/Real102/resourceLibrary/raw/master/img/previewOnMobile/host.png "vue.config.js")

## 查询 ip 地址

`win + R` 打开命令行工具，输入 `ipconfig` 即可查看本地的 ip 地址

![ip地址](https://github.com/Real102/resourceLibrary/raw/master/img/previewOnMobile/ip.png "ip地址")

## 配置手机 WiFi

打开连接的 WiFi，找到配置代理，选择自动，然后在 `URL` 处输入刚刚查询的 ip 地址，保存

![WiFi配置](https://github.com/Real102/resourceLibrary/raw/master/img/previewOnMobile/wifi.png "WiFi配置")

## 真机预览

配置完成后，手机上打开网址如 `http://192.168.1.103:8080/#/` 即可预览

## 扩展

如果是静态页面，纯 `HTML + CSS + JS`，推荐安装 vscode 插件： `Live Server`，然后点击右下角 `Go live` （如下图）同样可以预览

![Go Live](https://github.com/Real102/resourceLibrary/raw/master/img/previewOnMobile/live.png "Go Live")

![Go Live](https://github.com/Real102/resourceLibrary/raw/master/img/previewOnMobile/goLive.png "Go Live")

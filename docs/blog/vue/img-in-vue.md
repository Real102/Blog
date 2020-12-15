# vue 项目中图片路径问题

稍微整理一下在 vue 项目中使用图片过程中需要注意的点（防踩坑 🤓）

## 图片存放

项目中使用到的图片，存放的位置主要有两个：`public` 和 `assets/imgs`  
而在 vue-cli 官网指南，有这么一段话：

> 在 JavaScript 被导入或在 template/CSS 中通过相对路径被引用。这类引用会被 webpack 处理。  
> 放置在 public 目录下或通过绝对路径被引用。这类资源将会直接被拷贝，而不会经过 webpack 的处理。

因此，在存放使用的图片时，就需要考虑一下了。

1. 如果不希望被 webpack 处理（或改名），那么可以直接放在 public 下
2. 如果放在 assets 下，webpack 默认会处理，且处理后的图片名会有 hash 值（webpack 默认配置）
3. 在 assets 下，图片大小若小于 `10kB` （以[配置 🚀](#扩展)为准），webpack 会直接打包成 `base64` 格式
4. 需要压缩的图片，也需要放在 assets 下，并配合对应的配置（[配置 🚀](#压缩图片配置)）

## 图片引用

主要分使用的场景，这里就直接看代码了

-   template 中使用

```html
<!-- 以 ~ 开头，其后的任何内容都会作为一个模块请求被解析 -->
<img src="~@/assets/imgs/xx.png" alt="" />
<!-- 相对路径，会被 webpack 处理 -->
<img src="../assets/imgs/xx.png" alt="" />
<!-- 引用 public 下的图片，不会被 webpack 处理 -->
<img src="/public/img/xx.png" alt="" />
```

-   script 中的动态 url

```html
<img :src="imgUrl" />
```

```javascript
//不能直接用在src属性中，会报错
// imgSrc已被webpack处理过，文件名带有hash
import imgSrc from '@/assets/imgs/bg-small.jpg'
data() {
    return {
        imgUrl: '/public/img/xx.png'    // 绝对路径可以访问图片✅
        // imgUrl: '../assets/imgs/xx.png'    // 相对路径不可以访问图片❌
        // imgUrl: '~@/assets/imgs/xx.png'    // 相对路径不可以访问图片❌
        // imgUrl: imgSrc    // 先 import 可以访问图片✅
    }
},
```

-   css 中的图片

```css
background: url("/public/img/xx.png"); /*绝对路径✅*/
background: url("../assets/imgs/xx.png"); /*相对路径✅*/
background: url("~@/assets/imgs/xx.png"); /*相对路径✅*/
```

## 扩展

### 图片转 base64 配置

`url-loader` 为默认的 loader

```javascript
chainWebpack: config => {
	config.module
		.rule("images")
		.use("url-loader")
		.loader("url-loader")
		.tap(options => Object.assign(options, { limit: 10240 }))
		.end()
}
```

### 压缩图片配置

这里使用的是 `image-webpack-loader`

```javascript
chainWebpack: config => {
	config.module
		.rule("images")
		.test(/\.(png|jpg|jpeg|gif|svg)$/i)
		.use("image-webpack-loader")
		.loader("image-webpack-loader")
		.options({
			bypassOnDebug: true
		})
		.end()
}
```

## 参考文档

[vue-cli 处理静态资源 🚀](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#%E5%A4%84%E7%90%86%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90)

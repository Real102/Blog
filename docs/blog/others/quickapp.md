# 快应用的填坑日志

## 平台

**异常提醒**：

- 快应用联盟 IDE 查看错误日志没有那么友好，需要手动打开日志文件（入口在右侧模拟器上方）
- 如果遇到些问题感觉已经搞定了，但编辑器还一直报错，尝试关闭编辑器后再重启可能会正常运行

**华为快应用真机预览失败问题**：

1. 编辑器需要更新到最新版本，否则预览会失败
2. 需要使用华为手机进行预览

## HTML

- 不支持 `h` 标签
- 不支持 `i` 标签
- 不支持自闭合标签

## 样式 css

- 不支持 `box-shadow` 属性
- 不支持 `white-space` 属性
- 不允许直接使用 `background: #fff`，需调整为 `background-color: #fff`
- `display` 属性值仅支持 `flex | none`
- 不支持 `overflow：hidden`
- `tabs` 下使用 `fixed` 可能会出现每个 `tab` 都会出现 `fixed` 的内容
- 全局引入 `css/less/scss` 文件？
- 字符超出隐藏使用：`lines: 1; text-overflow: ellipsis`
- 选择器不支持 `:first-child` 等子孙选择器

## 代码 JavaScript

<!-- - 父子传值，如果单英文单词如 `size="small"` ，子组件无法正常接收 -->

## 编码采坑

**动态引入 js**：

可在编辑器左上角的编译设置下，增加启动参数：`--split-chunks-mode=smart`，然后在编辑器右侧预览区域的底部`预览设置 -> 重新编辑`

**使用 scss 预处理器**：

默认是 `less` 预处理器，欲换成 `scss` 需安装`sass、sass-loader、node-sass`三个依赖，安装之后若编辑器运行报错，可以重启编辑器

## 上架

**华为快应用上架资质**：

1. 首先确认好快应用的[所属分类](https://developer.huawei.com/consumer/cn/doc/50103)
2. 在[资质要求](https://developer.huawei.com/consumer/cn/doc/80301)列表中找到所属应用分类的要求，其中 **ICP 证** 或 **ICP 备案**、**《计算机软件著作权证书》**或 **《APP 电子版权证书》** 为必须提供内容
3. 如果是个人开发者同时还须提供**个人开发者承诺函**

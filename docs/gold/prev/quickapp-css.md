# 快应用 - 样式采坑指南

## 前言

本以为快应用样式这一块会跟普通 `H5` 开发一样，没想到遇到的问题还蛮多的，而且还有些挺常用的属性、使用方式等都没有支持，有点难搞。

以下稍微整理了些需要注意的地方，开发需谨慎，沉住气，不然挺废键盘的 🤣

## 样式 css

### 盒模型 box-sizing

快应用只支持 `border-box`， 也就是 `IE` 盒模型，开发时不需要设置也不需要改动也不能改动

### 阴影 box-shadow

不支持 `box-shadow`、`text-shadow` 等阴影属性。请看：[快应用论坛](https://bbs.quickapp.cn/forum.php?mod=viewthread&tid=1484)

目前只有 `canvas` 支持 `shadow` 属性，文档地址：[官方文档](https://doc.quickapp.cn/widgets/canvas.html?h=%E9%98%B4%E5%BD%B1#canvasrenderingcontext2dshadowblur-1060)

暂时就不要考虑使用阴影属性了，官方也没有给出什么时间支持。替代方案可以考虑一下用背景图，不过这么一来的话，容器 `div` 的宽高就比较难搞了，挺麻烦的

```css
/* 不支持 */
.unSupport {
  box-shadow: 0 0 0 #ccc;
}
```

### 背景 background

在 `H5` 上，我们一般习惯合并写 `background` 属性，一方面可以减少代码量，另一方面也可以让代码看起来更简洁一些。

但在快应用，`background` 是不支持合并写法的，只能拆分开来一个一个写，比如写一个背景图样式，如下：

（又多了几行代码，工资 up up up 🤣 ）

```css
.unSupport {
  /* 异常 */
  background: #fff; /* 编辑器异常：属性`background` 的值 `#fff` 存在问题: 背景类型 `#fff`暂不支持 */
  background: url("../../../assets/img/test.png") no-repeat;
  /* 以下正常写法 */
  background-color: #fff;
  background-image: url("../../../assets/img/test.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
```

### 圆角 border-radius

常规设置圆角值如：`border-radius: 8px` 没什么问题，但如果想要设置四个边角不同的圆角值时，并且使用常规的合并写法时，编辑器会报错，但实际上真机预览却可以正常显示

```css
.unSupport {
  /* 编辑器报异常，但真机可以预览 */
  border-radius: 8px 8px 0 0; /* 属性 `border-radius` 不支持单位 `px 8px 0 0`, 目前仅支持 `["px","%","dp"]*/
  /* 正常 */
  border-radius: 8px;
  /* 正常 */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
```

如果有使用 `css` 预处理器 `scss`，可以考虑封装为 `mixin` （看不得编辑器报错强迫症首选），方便快捷~

```scss
@mixin borderRadius($tl, $tr, $br, $bl) {
  border-top-left-radius: $tl;
  border-top-right-radius: $tr;
  border-bottom-right-radius: $br;
  border-bottom-left-radius: $bl;
}
```

### 文本超出隐藏 text-overflow

一般我们实现文本超出隐藏都会用到 [white-space](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space) 这个属性，但在快应用中没有这个属性，而是用另外一个属性代替，相对来说，快应用的使用会更简单方便一些

示例如下：

```css
/* before */
.textOverflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* after */
.textOverFlow {
  text-overflow: ellipsis;
  lines: 1;
}
```

注意，`text-overflow` 在快应用中只有两个值：`ellipsis` 和 `clip` 并且仅用于 `text` 标签

### 行间距与字间距 letter-spacing & word-spacing

[word-spacing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-spacing) 用于调整单词之间的间距（空格隔开就会被影响到）在快应用中暂不支持；

[letter-spacing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/letter-spacing) 用于调整文本字符之间的间距，在编辑器上会提示报错，但在**真机**预览上可以**正常使用**

```css
.unSupport {
  /* 编辑器报错，但真机正常使用 */
  letter-spacing: 10px;
  /* 编辑器报错，真机也不能正常使用 */
  word-spacing: 10px;
}
```

### css 子类/伪类选择器

快应用[选择器](https://doc.quickapp.cn/framework/style-sheet.html#%E9%80%89%E6%8B%A9%E5%99%A8)已经不支持子孙类选择器（直接子类还是支持的）以及伪类选择器

遇到那种 `list` 每一项都有 `border`，最后一项需要干掉 `border` 的时候比较蛋疼

```css
.unSupport {
  &:first-child,
  &:nth-child(2),
  &:nth-of-type() {
  }
  &:before,
  &:after {
  }
}
```

### 缩进 text-indent

测试发现，目前快应用仅 `text` 标签支持 `text-indent` 属性，在 `div`、`input` 上使用 `text-indent` 时编辑器会报异常，同时真机上也显示异常

```css
.unSupport {
  /* 编辑器报异常，真机预览无效 */
  div {
    text-indent: 10px;
  }
  /* 正常 */
  text {
    text-indent: 10px;
  }
}
```

### 布局类型 display

目前快应用仅支持 `display: flex | none` 且默认是以 `flex` 方式布局。

为了方便使用，可以考虑封装为 `mixin`，避免每次 `flex` 布局都需要写横向、纵向排列方式

```scss
@mixin flexBox($column, $justify, $align) {
  display: flex;
  flex-direction: $column;
  justify-content: $justify;
  align-items: $align;
}

.flexChild {
  flex-shink: 0;
  flex-grow: 0;
  flex-basis: 1;
}
```

### 动画 animation & transition

动画属性跟 `css3` 的使用方式基本相同，但需要有一些需要注意的点，快应用中动画支持的 `css` 属性有些不同，具体如下：

`animation` 支持的 `@keyframes` 属性有：

- background-color
- background-position
- opacity
- width/height
- transform

transition 支持的属性有：

- width
- height
- opacity
- visibility
- color -- **暂不支持**
- transform-origin
- transform
- padding
- padding-[left|top|right|bottom]
- margin
- margin-[left|top|right|bottom]
- border **暂不支持**
- border-[left|top|right|bottom] -- **暂不支持**
- border-width
- border-[left|top|right|bottom]-width
- border-color
- border-[left|top|right|bottom]-color
- border-radius -- **暂不支持**
- border-[top|bottom]-[left|right]-radius -- **暂不支持**
- background 仅支持属性 background-color，background-position
- background-color
- background-size -- **暂不支持**
- background-position
- flex
- flex-grow
- flex-shrink
- flex-basis
- [left|top|right|bottom]

animation 允许使用的属性有：
transition 允许使用的属性有：

## 其他

### 全局引入样式文件

很蛋疼，样式文件居然无法全局引入...

快应用不像 `vue` 有一个统一的程序入口，且父组件的样式影响不到子组件的样式，也没有深度选择器 `deep`，也不能直接在 `app.ux` 上写全局样式，写了也不生效

目前好像就只能在每一个文件 `import` 诸如 `vars.scss`、`common.scss` 等这些全局文件

## 写在最后

以上是自己在快应用开发过程中遇到的样式相关的问题

如果有新的内容，会继续更新在本文档，欢迎关注

如果对以上内容有问题，欢迎指教

我是枸哥，可以叫我杞爷

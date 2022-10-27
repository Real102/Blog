# 快应用的填坑日志

## 平台

**异常提醒**：

- 快应用联盟 `IDE` 查看错误日志没有那么友好，需要手动打开日志文件（入口在右侧模拟器上方，或控制台【输出】栏下选择 `hap-debug` ）
- 如果遇到些问题感觉已经修复了但编辑器还报错，可以考虑重新编译一下（如果修改到 `manifest` 文件需要重新编译才会更新，跟 `vue.config.js` 同理），或者尝试关闭编辑器后再重启。

**华为快应用真机预览失败问题**：

1. 编辑器需要更新到最新版本，否则预览会失败
2. 需要使用华为手机进行预览

## 代码 JavaScript

<!-- - 父子传值，如果单英文单词如 `size="small"` ，子组件无法正常接收 -->
<!-- - 全局引入方法/变量，在 `app.ux` 中定义，通过 `this.$app.$def` 引用 -->

- `vue` 中使用 `$refs` 获取子组件，而在快应用中则通过 `$child('#id')` 来获取，其中 `#id` 是指组件的属性 `id`
- 貌似不能用自定义指令？

## 编码采坑

**动态引入 js**：

可在编辑器左上角的编译设置下，增加启动参数：`--split-chunks-mode=smart`，然后在编辑器右侧预览区域的底部`预览设置 -> 重新编辑`

**使用 scss 预处理器**：

默认是 `less` 预处理器，欲换成 `scss` 需安装`sass、sass-loader、node-sass`三个依赖，安装之后若编辑器运行报错，可以重启编辑器

**访问全局变量**：

```javascript
// app.ux
export default {
  // data 可定义为函数或对象，对应的访问方式不同
  data() {
    return {
      status: false
    }
  },
  getStatus() {
    console.log(this.status) // undefined
    console.log(this.data().status) // false
    return this.data().status
  }
}

// home.ux
export default {
  computed: {
    getStatus() {
      return this.$app.$def.data().status
    },
    globalStatus() {
      return this.$app.$def.getStatus()
    }
  }
}
```

如上代码所示，`app.ux` 中访问 `data` 中的变量，需要通过 `this.data().status` 方式获取，而非直接通过 `this.status` 体验上稍微有点不舒服...

在非 `app.ux` 页面访问全局变量和方法，如上图 `home.ux` 所示，均需要通过 `this.$app.$def` 的方式去获取到 `app.ux` 的实例，然后再具体获取所需要的数据

此外还可以使用 `global` 全局变量

然后通过 `global.status` 访问

## 全局组件

在 `app.ux` 中引入后可以在子页面中直接使用，但注意不要在子页面重复引入该组件

## 上架

**华为快应用上架资质**：

1. 首先确认好快应用的[所属分类](https://developer.huawei.com/consumer/cn/doc/50103)
2. 在[资质要求](https://developer.huawei.com/consumer/cn/doc/80301)列表中找到所属应用分类的要求，其中 **ICP 证** 或 **ICP 备案**、**《计算机软件著作权证书》**或 **《APP 电子版权证书》** 为必须提供内容
3. 如果是个人开发者同时还须提供**个人开发者承诺函**

## 最后

吐槽一句，快应用踩过的坑比马里亚纳海沟还深

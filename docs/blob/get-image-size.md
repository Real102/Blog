# 如何在上传图片时限制宽高/尺寸--JavaScript

先上代码

```javascript
// 代码不能直接使用，使用前请自行优化调整
uploadImage(e) {
    // let event = e || window.event    // 如有需要，这里也考虑一下event的兼容
    let file = e.file
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(data) {
        let result = data.target.result
        let image = new Image()
        image.src = result
        image.onload = function() {
            let width = this.width
            let height = this.height
            if(width === 1080 && height === 1920) {
                alert('上传的图片尺寸错误，请重新上传！')
            }
        }
    }
}
```

获取图片宽高的关键代码就是上面部分。

主要思路是：将 file 对象转换成 base64 数据，实例化 image 对象并将 base64 数据数据赋值到 image 的 src 属性（图片预加载的原理），借助 image 的 onload 事件，在图片加载完成时，通过 width 和 height 属性获取宽高

下面是一些相关理解及相关知识的扩展，请酌情食用

## file 对象

需要获取图片相关的数据，第一步肯定是需要先获取到 file 对象。上传文件的数据都被包含在 file 对象中

```html
<input type="file" id="uploadFile" />
```

在原生 input 中，我们可以通过 change 事件来获取上传的 file 对象，如果用其他组件或库可能会不一样如：[Element UI](https://element.eleme.cn/#/zh-CN/component/upload){target="_blank"}，可以直接通过 __`on-change`__ 钩子直接拿到 file 对象

```javascript
let fileObj = document.getElementById("uploadFile")
fileObj.onchange = function (e) {
    let file = e.target.files[0]
}
```

<!-- TODO -->
<!-- https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader -->
<!-- https://developer.mozilla.org/zh-CN/docs/Web/API/Blob -->
<!-- https://juejin.im/post/5b18891a6fb9a01e7a44c8bd -->

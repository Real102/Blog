# 如何在上传图片时限制宽高/尺寸--JavaScript

## 实现代码

```javascript
// 代码不能直接使用，使用前请自行优化调整
uploadImage(e) {
    // let event = e || window.event // 如有需要，这里也考虑一下event的兼容
    let file = e.file
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(data) { // 注意要在onload事件之后再执行后续操作
        let result = data.target.result
        let image = new Image() // new 一个 image对象
        image.src = result // 将转换的文件流赋值到 src 属性
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

## 实现思路

将 file 对象转换成 base64 数据，实例化 image 对象并将 base64 数据数据赋值到 image 的 src 属性（图片预加载的原理），借助 image 的 onload 事件，在图片加载完成时，通过 width 和 height 属性获取宽高

下面是一些相关理解及相关知识的扩展，请酌情食用

## 扩展

### File 对象

需要获取图片相关的数据，第一步肯定是需要先获取到 file 对象。上传文件的数据都被包含在 file 对象中

```html
<input type="file" id="uploadFile" />
```

在原生 input 中，我们可以通过 change 事件来获取上传的 file 对象，如果用其他组件或库会有所不同，如：[Element UI](https://element.eleme.cn/#/zh-CN/component/upload)，可以通过 **`on-change`** 钩子拿到 file 对象

```javascript
let fileObj = document.getElementById("uploadFile")
fileObj.onchange = function(e) {
	let file = e.target.files[0]
}
```

### FileReader 对象

FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

> 重要提示： FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。 要在 JavaScript 中按路径名读取文件，应使用标准 Ajax 解决方案进行服务器端文件读取，如果读取跨域，则使用 CORS 权限。

fileReader 一般有以下四种方法，可以将文件流转换成其他我们需要的格式，其转换结果已经被包含在它的 result 属性里：

| readAsArrayBuffer                                       | readAsBinaryString                             | readAsDataURL                                                     | readAsText                     |
| ------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------- | ------------------------------ |
| 读取完成后，返回的是被读取文件的 `ArrayBuffer` 数据对象 | 读取完成后，返回的是被读取文件的原始二进制数据 | 读取完成后，返回的对象将会是一个 `data:` URL 格式的 Base64 字符串 | 读取完成后，返回的将会是字符串 |

转换完成后（通过 onload 事件判断），我们可以通过 **`e.target.result`** 来获取，这样就可以赋值到 image 对象的 src 属性了。

### Image 对象

在使用 **`new Image()`** 创建 image 对象时，Image 对象将会创建一个新的 HTMLImageElement 实例，它的功能等价于 **`document.createElement('img')`**，因此，我们可以通过实例化的 image 对象来获取它的宽高属性。此外 Image() 也有两个可选参数：width 宽度和 height 高度，在其他需要的场景下可以设置图片的宽高

## 参考文档

[FileReader -- MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)  
[Image --MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/Image)

<!-- [https://developer.mozilla.org/zh-CN/docs/Web/API/Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) -->

<!-- https://juejin.im/post/5b18891a6fb9a01e7a44c8bd -->

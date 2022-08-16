# 手机号输入框的格式化显示（1xx xxxx xxxx）

## 需求简介

收到过一个需求，要求手机号输入框按下图的样式显示

<!-- （看的第一眼就想到，一个输入框要搞那么花哨吗？完了，感觉有老油条内味了） -->

![手机号显示样式](https://github.com/Real102/resourceLibrary/raw/master/img/formatPhone/phone-style.png)

> 项目环境：vue2.x

## 实现思路

简单琢磨了一下，发现可以通过两种方式去实现

1. 自行模拟一个用户输入框实现（好像还没搞定~😅）
2. 监听 input 的输入事件，然后插入空格实现

这里主要分享下第二种解决方案的过程

### 初步实现

```html
<input
  type="tel"
  ref="tel"
  v-model="bPhone"
  @input="handlePhoneInput"
  placeholder="请输入您的手机号码"
  @blur="validPhone"
  maxlength="13"
/>
<!-- tips: -->
<!-- 这里 v-model 使用的是 bPhone，即处理后的号码，实际提交数据的号码存在 phone 中 -->
<!-- maxlength = 13 是因为bPhone是处理过的手机号码，中间会有两个空格，因此是13位 -->
```

```javascript
handlePhoneInput() {
    let arr = this.bPhone.replace(/\s/gi, '')   // 记录不包含空格的内容
    let len = this.bPhone.length    // 初始化已输入的长度，包括空格
    let temp = arr.split('')
    if(arr.length > 3) {
        temp.splice(3, 0, ' ')
        if(arr.length > 7) {
            temp.splice(8, 0, ' ')
        }
    }
    this.bPhone = temp.join('') // 处理后的手机号
    this.phone = arr    // 存储真实的手机号
}

// 下为扩展
const Mphone = /^1\d{10}$/  // 校验正则，vue中自行切换至data中
validPhone() {
    if(!this.phone || !this.phone.match(this.Mphone)) {
        this.$msg('请输入正确格式的手机号码')
    } else {
        // ...
    }
}
```

基本功能已经初步实现出来了，但尝试了下发现几个问题：

1. 移动光标并添加/删除一位（非最后一位），删除后光标会自动跳到最后
2. 移动光标到空格后，按删除不生效，并且光标同样会跳转到最后

思考了一下，着手先解决光标的问题。

### 解决光标问题

1. 首先，需要判断当前用户是输入还是删除。这里需要借助一下 event 对象中的 [inputType🚀](https://developer.mozilla.org/zh-CN/docs/Web/API/InputEvent/inputType) 属性。（inputType 兼容主流浏览器，IE 除外，这里暂未处理兼容问题）
2. 其次需要获取到当前光标的位置，然后重新设置异常情况下光标的位置

基于以上两点，对代码做出以下改动

```javascript
    handlePhoneInput(e) {
        let arr = this.bPhone.replace(/\s/gi, '') // 记录不包含空格的内容
        let len = this.bPhone.length // 初始化已输入的长度，包括空格
        let temp = arr.split('')
        let pos = this.getPosition(this.$refs.tel) // 获取当前光标位置，
        let status = e.inputType === 'deleteContentBackward' ? 'minus' : 'plus' // 用于判断当前是输入还是删除
        // 初始化光标位置为当前位置，这里需要着重处理删除的情况
        let cursorPos = pos
        if (status === 'minus') {
            // 当删除空格时，需要手动将空格前一位也一并删除，因此光标位置也要减一
            // 获取当前的位置是包含空格的，但删除需要注意，是要删除没有空格下的数据（未处理），也就是temp
            if (pos === 3) {
                temp.splice(2, 1)
                cursorPos--
            }
            if (pos === 8) {
                temp.splice(6, 1)
                cursorPos--
            }
        }
        if (arr.length > 3) {
            // 位数超过3，则补充一个空格
            temp.splice(3, 0, ' ')
            if (arr.length > 7) {
                // 位数超过7，同样需要补充一个空格
                // 因为是根据没有空格的手机号去判断，因此这里是： arr.length > 7
                // 因为一开始第四位补充了一个空格，因此这里要在第八位插入一个空格
                temp.splice(8, 0, ' ')
            }
            // 重新计算光标的位置，区分输入与删除两种情况
            status === 'plus' && (pos === 4 || pos === 9) ? cursorPos++ : ''
            status === 'minus' && (pos === 4 || pos === 9) ? cursorPos-- : ''
        }
        this.bPhone = temp.join('') // 处理后的手机号
        this.phone = arr // 存储真实的手机号
        setTimeout(() => {
            this.setPosition(this.$refs.tel, cursorPos)
        }, 0)
    },
    // 获取当前光标位置
    getPosition(el) {
        let cursorPos = 0
        if (document.selection) {
            var selectRange = document.selection.createRange()
            selectRange.moveStart('character', -el.value.length)
            cursorPos = selectRange.selectionStart
        } else if (el.selectionStart || el.selectionStart === '0') {
            cursorPos = el.selectionStart
        }
        return cursorPos
    }
    // 设置光标位置
    setPosition(textDom, pos) {
        if (textDom.setSelectionRange) {
            textDom.focus()
            textDom.setSelectionRange(pos, pos)
        } else if (textDom.createTextRange) {
            var range = textDom.createTextRange()
            range.collapse(true)
            range.moveEnd('character', pos)
            range.moveStart('character', pos)
            range.select()
        }
    }
```

### 删除失效问题

其实空格删除失效的问题，在上面的代码就已经解决了。在每次执行删除操作时，判断只要是第三位/第八位，也就是在空格后执行操作时，主动把空格前一位的数字一并删除，并且将 cursorPos 左移一位，保证光标位置正确显示

```javascript
if (status === "minus") {
  // 当删除空格时，需要手动将空格前一位也一并删除，因此光标位置也要减一
  // 获取当前的位置是包含空格的，但删除需要注意，是要删除没有空格下的数据（未处理），也就是temp
  if (pos === 3) {
    temp.splice(2, 1)
    cursorPos--
  }
  if (pos === 8) {
    temp.splice(6, 1)
    cursorPos--
  }
}
```

### 最终效果

![手机号显示样式](https://github.com/Real102/resourceLibrary/raw/master/img/formatPhone/demo.gif)

## 优化

TODO

1. 代码中使用了较多的 if else，需进一步优化，简化代码
2. 兼容性完善：inputType 在 IE 不可用，可以考虑通过记录操作前后字符的长度来判断执行的操作
3. 光标会“闪一下”的问题
4. 封装成 vue 指令

## 附录

- [inputType 兼容性 🚀](https://caniuse.com/?search=inputtype)
- [inputType MDN 文档 🚀](https://developer.mozilla.org/zh-CN/docs/Web/API/InputEvent/inputType)

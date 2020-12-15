# 图片预加载 JavaScript 实现

## 实现代码

```javascript
let successNum = 0  // 已经加载成功/失败的数量
const $loadingText = $('.loadingText')  // 百分比数据显示DOM
const $loadingBar = $('.loadingBar')    // 进度条显示DOM
const imgList = [
    'http://xxx.com/img/1.png',
    'http://xxx.com/img/2.png',
    'http://xxx.com/img/3.png',
    'http://xxx.com/img/4.png',
    'http://xxx.com/img/5.png',
    ...
]
function startLoading() {
	for (let i = 0; i < imgList.length; i++) {
		imgs[i] = new Image()   // 为每一个图片初始化一个 image 对象
		imgs[i].src = imgList[i]    // 将图片地址赋值给 src
		imgs[i].onload = function () {  // 监听 onload 事件
			successNum++
			let per = Math.floor((successNum * 100) / len)  // 计算完成百分比
			$loadingText.text(per + '%')    // 在页面上显示
			$loadingBar.css('left', per - 100 + '%')   // 进度条显示样式
			// 判断是否全部加载完成
			imgLoadAll()
		}
		imgs[i].onerror = function () {
            // 当图片加载失败时，不更改已完成的百分数。
			errorNum++
			// 判断是否全部加载完成
			imgLoadAll()
		}
	}
}

function imgLoadAll() {
	if (successNum + errorNum === len) {
        // 这里判断是否已经全部加载完成（包括失败的）
        $loadingText.innerText = '100%'
		$loadingBarColor.css('left', 0)
		setTimeout(() => {
			// 延迟一秒再进入首页
			window.location.hash = 'home'
		}, 1000)
	}
}

```

## 实现思路

## 扩展

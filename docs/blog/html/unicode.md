# 了解字符编码

## ASCII 码

> [百度百科 🚀](https://baike.baidu.com/item/ASCII/309296)：  
> ASCII (American Standard Code for Information Interchange): 美国信息交换标准代码，是基于拉丁字母的一套**电脑编码系统**，主要用于显示现代英语和其他西欧语言。
> 到目前为止，ASCII 码总共收录了 128 个字符

<!-- ASCII 码使用八位二进制数组合来表示 128 个数字，首位为 0（在标准 ASCII 码中用于奇偶校验），其余七位用于表示 128 个字符。但 **为什么用二进制数组合** 表示 ASCII 码呢？ -->

在计算机中，所有数据都是以二进制的形式存储（通俗一点来说，电脑只认得 0（低电平）和 1（高电平）），比如 ABC，字母符号等在计算机中也是需要转换成二进制形式存储。为了能够通用而不造成混乱，于是就制定了一个规则，这就是 `ASCII` 编码，统一规定了用哪些数字来表示我们常用的字符

一般而言，我们可以理解 ASCII 码为 128 个数字（0 - 127），每个数字分别代表 0-9a-zA-Z、符号以及控制字符（如 LR：换行符、CR：回车符等）或通信专用字符（如 SOH：文头、EOT：文尾等）

### 字符串与 ASCII 码的相互转换

```javascript
// 字符串转 ASCII 码：
let str = "hello world"
let arr = []
str.split("").forEach(item => {
  arr.push(item.codePointAt(0))
})
// arr: (11) [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]

// ASCII 码转字符串：
let arr = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]
let res = []
arr.forEach(item => {
  res.push(String.fromCharCode(item))
})
// res: (11) ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
```

## Unicode 编码

> [百度百科 🚀](https://baike.baidu.com/item/Unicode%E7%A0%81/7704811?fr=aladdin)  
> Unicode 是一种编码方案，为了解决传统的字符编码方案的局限而产生的。它为每种语言中的每个字符都设定了统一并且唯一的**二进制编码**，以满足跨语言、跨平台进行文本交换、处理的要求。  
> Unicode 主要有三种具体表现：utf-8、utf-16、utf-32。其中 utf-8 是一种变长的编码方法，字符长度从 1-4 个字节不等，utf-16 占用 2 或 4 个字节，utf-32 占 4 个字节

Unicode 从 0 开始，为每一个符号指定一个编码，这叫做“码点”（code point），比如码点 0 的字符是 null。

```markdown
U+0000 = null
U+597D = 好
```

U+表示紧跟在后面的十六进制数是 Unicode 的码点（但一般情况下，都会转换成 `\uxxxx` 表示）

### Unicode 与字符串的相互转换

```javascript
// 字符串转Unicode编码
let str = "我们都是中国人`0"
let uni = ""
str.split("").forEach(item => {
  // 转换成十六进制（码点），并在前面加上'\u'
  // 注意：这里需要处理一下，位数如果小于4的话，后面转换会出错
  let temp = item.codePointAt(0).toString(16)
  while (temp.length < 4) temp = 0 + temp
  uni += "\\u" + temp
})
// console.log(uni)
// \u6211\u4eec\u90fd\u662f\u4e2d\u56fd\u4eba\u0060\u0030

// Unicode编码转字符串
let str = "\u6211\u4eec\u90fd\u662f\u4e2d\u56fd\u4eba\u0060\u0030"
// 这里先转换成 %uxxxx 形式，再调用 unescape 转换
let res = unescape(str.replace(/\\/gi, "%"))
// console.log(res)
// 我们都是中国人`0
```

## UTF-8 编码

> [百度百科 🚀](https://baike.baidu.com/item/UTF-8/481798?fr=aladdin)  
> UTF-8（Universal Character Set/Unicode Transformation Format）是针对 Unicode 的一种**可变长度字符编码**（使用 1~4 字节为每个字符编码）。它可以用来表示 Unicode 标准中的任何字符

- 一个 ASCII 字符只需 1 字节编码（Unicode 范围由 U+0000~U+007F）
- 带有变音符号的拉丁文、希腊文、西里尔字母、亚美尼亚语、希伯来文、阿拉伯文、叙利亚文等字母则需要 2 字节编码（Unicode 范围由 U+0080~U+07FF）
- 其他语言的字符（包括中日韩文字、东南亚文字、中东文字等）包含了大部分常用字，使用 3 字节编码
- 其他极少使用的语言字符使用 4 字节编码

可以明显的感觉到，UTF-8 的这个特性可以节省很多空间，试想一下，如果用 UTF-32 编码，每一个字符都用四个字节表示，除了极少的语言字符需要用到四个字节外，其他都不需要用到那么多空间，导致浪费很多的资源。这也使得 UTF-8 成为互联网上最常见的网页编码

## GBK 编码

> [百度百科 🚀](https://baike.baidu.com/item/GBK%E5%AD%97%E5%BA%93/3910360?fr=aladdin)  
> GBK 编码，是在 GB2312-80 标准基础上的内码扩展规范，使用了**双字节编码**方案，其编码范围从 8140 至 FEFE（剔除 xx7F），共 23940 个码位，共收录了 21003 个汉字，完全兼容 GB2312-80 标准，支持国际标准 ISO/IEC10646-1 和国家标准 GB13000-1 中的全部中日韩汉字，并包含了 BIG5 编码中的所有汉字。GBK 编码方案于 1995 年 10 月制定， 1995 年 12 月正式发布，中文版的 WIN95、WIN98、WINDOWS NT 以及 WINDOWS 2000、WINDOWS XP、WIN 7 等都支持 GBK 编码方案。

## 附录

### ASCII 码映射表

| SCII 值 | 控制字符 | ASCII 值 | 控制字符 | ASCII 值 | 控制字符 | ASCII 值 | 控制字符 |
| ------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 0       | NUT      | 32       | (space)  | 64       | @        | 96       | 、       |
| 1       | SOH      | 33       | !        | 65       | A        | 97       | a        |
| 2       | STX      | 34       | "        | 66       | B        | 98       | b        |
| 3       | ETX      | 35       | #        | 67       | C        | 99       | c        |
| 4       | EOT      | 36       | \$       | 68       | D        | 100      | d        |
| 5       | ENQ      | 37       | %        | 69       | E        | 101      | e        |
| 6       | ACK      | 38       | &        | 70       | F        | 102      | f        |
| 7       | BEL      | 39       | ,        | 71       | G        | 103      | g        |
| 8       | BS       | 40       | (        | 72       | H        | 104      | h        |
| 9       | HT       | 41       | )        | 73       | I        | 105      | i        |
| 10      | LF       | 42       | \*       | 74       | J        | 106      | j        |
| 11      | VT       | 43       | +        | 75       | K        | 107      | k        |
| 12      | FF       | 44       | ,        | 76       | L        | 108      | l        |
| 13      | CR       | 45       | -        | 77       | M        | 109      | m        |
| 14      | SO       | 46       | .        | 78       | N        | 110      | n        |
| 15      | SI       | 47       | /        | 79       | O        | 111      | o        |
| 16      | DLE      | 48       | 0        | 80       | P        | 112      | p        |
| 17      | DCI      | 49       | 1        | 81       | Q        | 113      | q        |
| 18      | DC2      | 50       | 2        | 82       | R        | 114      | r        |
| 19      | DC3      | 51       | 3        | 83       | S        | 115      | s        |
| 20      | DC4      | 52       | 4        | 84       | T        | 116      | t        |
| 21      | NAK      | 53       | 5        | 85       | U        | 117      | u        |
| 22      | SYN      | 54       | 6        | 86       | V        | 118      | v        |
| 23      | TB       | 55       | 7        | 87       | W        | 119      | w        |
| 24      | CAN      | 56       | 8        | 88       | X        | 120      | x        |
| 25      | EM       | 57       | 9        | 89       | Y        | 121      | y        |
| 26      | SUB      | 58       | :        | 90       | Z        | 122      | z        |
| 27      | ESC      | 59       | ;        | 91       | [        | 123      | {        |
| 28      | FS       | 60       | <        | 92       | /        | 124      | \|       |
| 29      | GS       | 61       | =        | 93       | ]        | 125      | }        |
| 30      | RS       | 62       | >        | 94       | ^        | 126      | `        |
| 31      | US       | 63       | ?        | 95       | \_       | 127      | DEL      |

### 参考文档

- [ASCII 编码 🚀](https://baike.baidu.com/item/ASCII/309296)
- [Unicode 编码 🚀](https://baike.baidu.com/item/Unicode%E7%A0%81/7704811?fr=aladdin)
- [Unicode 与 JavaScript 详解 🚀](http://www.ruanyifeng.com/blog/2014/12/unicode.html)

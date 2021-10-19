# 常用的加密方案及相关实现代码

## 对称加密

对称加密是最快速、最简单的一种加密方式，加密与解密用的是同样的密钥。对称加密一般使用相对较小的密钥，因为密钥越大，加密越强，相应的加解密的时间就更长。典型的对称加密算法有：`AES`、`DES` 等

优点：

-   加密速度快，在发送大量数据的时候使用，计算速度快，效率高

缺点：

-   共用一个加解密的秘钥
-   秘钥的传输安全性较低

### AES 加密算法

前端一般会基于 [crypto.js 🚀](https://www.npmjs.com/package/crypto-js) 来实现 `AES` 加密

`AES`加解密代码

```javascript
  // 加密
  encrypt(word, keyStr) {
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.toString()
  },
  //解密
  decrypt(word, keyStr) {
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  },
```

#### 参数解析

##### 模式 mode

-   `ECB` 模式：最简单的一种加密模式，每个块进行独立加密，块与块之间加密互不影响，这样就能并行，效率高。虽然这样加密很简单，但是不安全，如果两个块的`明文一模一样`，那么加密出来的`密文也一模一样`。
-   `CBC` 模式：引入了一个新的概念，初始向量 `iv` （偏移量）
-   `CTR`，`OCF`，`CFB`...

##### 填充 padding

-   `NoPadding`：不填充，但要求原始加密字符串必须是 128 的整数倍
-   `PKCS5`：假设块大小为 8 个字节，如果这个块只有 5 个字节，差 8 字节还有 3 个，那么后续就补上 3 个 3；如果恰巧是 8 个字节，那么会在原串后补上 8 个 8（方便解密），因此只需要看最后一位就能算出原块的大小是多少
-   `PKCS7`：填充方式跟 `Pkcs5` 一致，不同的是，`Pkcs5` 只是对 8 字节块进行填充，而 `Pkcs7` 可以对 1~256 字节大小的块进行填充

##### 偏移量 iv

iv 的作用就是为了防止同样的明文块被加密成同样的内容。原理是第一个明文块跟初始向量做异或后加密，第二个块跟第一个密文块做异或再加密，依次类推，避免了同样的块被加密成同样的内容。

## 非对称加密

需要两个密钥，一个公钥一个私钥，使用其中一把密钥（公钥）加密后的明文，只有对应的密钥（私钥）才能解的开。典型的非对称加密算法有：`RSA`

优点：

-   有一个公钥和一个私钥
-   相同数据经过公钥加密的结果不一致
-   破解难度高（但目前 512 位已被破解，需要使用 1024+）

缺点：

-   加密速度慢，效率低，只适合数据量较小的情况

### RSA 加密算法

`RSA` 可以用来做加密或者做签名，两者性质不一样：签名的作用是让接受方验证你传过去的数据没有被篡改；加密的作用是保证数据不被窃取。

数据加密一般是由服务端生成密码对（公钥和私钥），公钥发给前端保存（相当于公开了公钥），私钥由服务端保存。在不考虑其他情况下，私钥加密公钥解密也是成立的，但由于公钥的生成规则相对来说“不太满足”密码标准的要求，容易被破解，因此在实际情况下不太可行。前端主要借助 jsencrypt 库进行加密/签名

对于签名，则是由私钥来加密签名，公钥解密验签。如果是用公钥加密的方式去验签，那么很容易伪造签名，因为公钥是近乎公开的

`RSA`加密代码

```javascript
// RSA加密
var encrypt = new JSEncrypt()
encrypt.setPublicKey($("#pubkey").val())
var encrypted = encrypt.encrypt($("#input").val())

// RSA解密
var decrypt = new JSEncrypt()
decrypt.setPrivateKey($("#privkey").val())
var uncrypted = decrypt.decrypt(encrypted)

// 签名
var sign = new JSEncrypt()
sign.setPrivateKey($("#privkey").val())
var signature = sign.sign($("#input").val(), CryptoJS.SHA256, "sha256")
```

[RSA 实现原理 🚀]('https://blog.csdn.net/jijianshuai/article/details/80582187')

## MD5 摘要

`MD5`消息摘要算法（M`D5 Message-Digest Algorithm`），是在计算机领域被广泛使用的一种哈希算法，用来对信息进行完整性保护。`MD5` 将一个任意长度的数据经过编码得到一个 128 位（16 字节）的哈希值，即为 `MD5` 值。于 1992 年公开，用以取代 MD4 算法。

特点：

-   压缩性：任意长度的数据，算出的 MD5 值长度都是固定的。
-   易计算：从原数据计算出 MD5 值很容易。
-   抗修改性：对原数据进行任何改动，哪怕只修改 1 个字节，所得到的 MD5 值都有很大区别。
-   强抗碰撞：已知原数据和其 MD5 值，想找到一个具有相同 MD5 值的数据（即伪造数据）是非常困难的。

应用场景：

-   防篡改，保障文件传输可靠性
-   增强密码保存的安全性
-   数字签名

安全性：

`MD5`虽然被广泛应用，但仍存在弱点，可以被加以破解，`MD5`算法无法防止碰撞，并已有碰撞成功案例。对于需要高度安全性的数据，一般建议改用其他算法，如`SHA-2`等。目前互联网上已经有很多字符串与`MD5`的数据库，基本上可以认为没有加`SALT`的`MD5`值类似于裸奔了（[md5 逆向功能 🚀](https://www.md5online.org/)）

## 生成随机密钥

```javascript
  getGeneralKey() {
    const str = 'abcdefghijklmnopqrstuvwxyz0123456789'
    // 先经过一层乱序
    const arr = str.split('').sort(() => (Math.random() > 0.5 ? 1 : -1))
    const keyLen = 32
    const aesKey = []
    // 然后再随机生成秘钥
    for (let i = 0; i < keyLen; i++) {
      const temp = Math.floor(Math.random(0, 1) * 36)
      aesKey.push(arr[temp])
    }
    return aesKey.join('')
  },
```

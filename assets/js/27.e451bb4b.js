(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{418:function(t,s,a){"use strict";a.r(s);var n=a(45),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"常用的加密方案及相关实现代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用的加密方案及相关实现代码"}},[t._v("#")]),t._v(" 常用的加密方案及相关实现代码")]),t._v(" "),a("h2",{attrs:{id:"对称加密"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#对称加密"}},[t._v("#")]),t._v(" 对称加密")]),t._v(" "),a("p",[t._v("对称加密是最快速、最简单的一种加密方式，加密与解密用的是同样的密钥。对称加密一般使用相对较小的密钥，因为密钥越大，加密越强，相应的加解密的时间就更长。典型的对称加密算法有："),a("code",[t._v("AES")]),t._v("、"),a("code",[t._v("DES")]),t._v(" 等")]),t._v(" "),a("p",[t._v("优点：")]),t._v(" "),a("ul",[a("li",[t._v("加密速度快，在发送大量数据的时候使用，计算速度快，效率高")])]),t._v(" "),a("p",[t._v("缺点：")]),t._v(" "),a("ul",[a("li",[t._v("共用一个加解密的秘钥")]),t._v(" "),a("li",[t._v("秘钥的传输安全性较低")])]),t._v(" "),a("h3",{attrs:{id:"aes-加密算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#aes-加密算法"}},[t._v("#")]),t._v(" AES 加密算法")]),t._v(" "),a("p",[t._v("前端一般会基于 "),a("a",{attrs:{href:"https://www.npmjs.com/package/crypto-js",target:"_blank",rel:"noopener noreferrer"}},[t._v("crypto.js 🚀"),a("OutboundLink")],1),t._v(" 来实现 "),a("code",[t._v("AES")]),t._v(" 加密")]),t._v(" "),a("p",[a("code",[t._v("AES")]),t._v("加解密代码")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 加密")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("encrypt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("word"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" keyStr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("enc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Utf8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("keyStr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" srcs "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("enc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Utf8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("word"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" encrypted "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("AES")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("encrypt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("srcs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      mode"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ECB")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      padding"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pad"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Pkcs7"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" encrypted"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//解密")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("decrypt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("word"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" keyStr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("enc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Utf8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("keyStr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" decrypt "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("AES")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("decrypt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("word"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      mode"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ECB")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      padding"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pad"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Pkcs7"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("enc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Utf8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("decrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),a("h4",{attrs:{id:"参数解析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参数解析"}},[t._v("#")]),t._v(" 参数解析")]),t._v(" "),a("h5",{attrs:{id:"模式-mode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模式-mode"}},[t._v("#")]),t._v(" 模式 mode")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("ECB")]),t._v(" 模式：最简单的一种加密模式，每个块进行独立加密，块与块之间加密互不影响，这样就能并行，效率高。虽然这样加密很简单，但是不安全，如果两个块的"),a("code",[t._v("明文一模一样")]),t._v("，那么加密出来的"),a("code",[t._v("密文也一模一样")]),t._v("。")]),t._v(" "),a("li",[a("code",[t._v("CBC")]),t._v(" 模式：引入了一个新的概念，初始向量 "),a("code",[t._v("iv")]),t._v(" （偏移量）")]),t._v(" "),a("li",[a("code",[t._v("CTR")]),t._v("，"),a("code",[t._v("OCF")]),t._v("，"),a("code",[t._v("CFB")]),t._v("...")])]),t._v(" "),a("h5",{attrs:{id:"填充-padding"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#填充-padding"}},[t._v("#")]),t._v(" 填充 padding")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("NoPadding")]),t._v("：不填充，但要求原始加密字符串必须是 128 的整数倍")]),t._v(" "),a("li",[a("code",[t._v("PKCS5")]),t._v("：假设块大小为 8 个字节，如果这个块只有 5 个字节，差 8 字节还有 3 个，那么后续就补上 3 个 3；如果恰巧是 8 个字节，那么会在原串后补上 8 个 8（方便解密），因此只需要看最后一位就能算出原块的大小是多少")]),t._v(" "),a("li",[a("code",[t._v("PKCS7")]),t._v("：填充方式跟 "),a("code",[t._v("Pkcs5")]),t._v(" 一致，不同的是，"),a("code",[t._v("Pkcs5")]),t._v(" 只是对 8 字节块进行填充，而 "),a("code",[t._v("Pkcs7")]),t._v(" 可以对 1~256 字节大小的块进行填充")])]),t._v(" "),a("h5",{attrs:{id:"偏移量-iv"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#偏移量-iv"}},[t._v("#")]),t._v(" 偏移量 iv")]),t._v(" "),a("p",[t._v("iv 的作用就是为了防止同样的明文块被加密成同样的内容。原理是第一个明文块跟初始向量做异或后加密，第二个块跟第一个密文块做异或再加密，依次类推，避免了同样的块被加密成同样的内容。")]),t._v(" "),a("h2",{attrs:{id:"非对称加密"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#非对称加密"}},[t._v("#")]),t._v(" 非对称加密")]),t._v(" "),a("p",[t._v("需要两个密钥，一个公钥一个私钥，使用其中一把密钥（公钥）加密后的明文，只有对应的密钥（私钥）才能解的开。典型的非对称加密算法有："),a("code",[t._v("RSA")])]),t._v(" "),a("p",[t._v("优点：")]),t._v(" "),a("ul",[a("li",[t._v("有一个公钥和一个私钥")]),t._v(" "),a("li",[t._v("相同数据经过公钥加密的结果不一致")]),t._v(" "),a("li",[t._v("破解难度高（但目前 512 位已被破解，需要使用 1024+）")])]),t._v(" "),a("p",[t._v("缺点：")]),t._v(" "),a("ul",[a("li",[t._v("加密速度慢，效率低，只适合数据量较小的情况")])]),t._v(" "),a("h3",{attrs:{id:"rsa-加密算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rsa-加密算法"}},[t._v("#")]),t._v(" RSA 加密算法")]),t._v(" "),a("p",[a("code",[t._v("RSA")]),t._v(" 可以用来做加密或者做签名，两者性质不一样：签名的作用是让接受方验证你传过去的数据没有被篡改；加密的作用是保证数据不被窃取。")]),t._v(" "),a("p",[t._v("数据加密一般是由服务端生成密码对（公钥和私钥），公钥发给前端保存（相当于公开了公钥），私钥由服务端保存。在不考虑其他情况下，私钥加密公钥解密也是成立的，但由于公钥的生成规则相对来说“不太满足”密码标准的要求，容易被破解，因此在实际情况下不太可行。前端主要借助 jsencrypt 库进行加密/签名")]),t._v(" "),a("p",[t._v("对于签名，则是由私钥来加密签名，公钥解密验签。如果是用公钥加密的方式去验签，那么很容易伪造签名，因为公钥是近乎公开的")]),t._v(" "),a("p",[a("code",[t._v("RSA")]),t._v("加密代码")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// RSA加密")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" encrypt "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("JSEncrypt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nencrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setPublicKey")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#pubkey"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("val")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" encrypted "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" encrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("encrypt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#input"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("val")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// RSA解密")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" decrypt "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("JSEncrypt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ndecrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setPrivateKey")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#privkey"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("val")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" uncrypted "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" decrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("decrypt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("encrypted"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 签名")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" sign "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("JSEncrypt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nsign"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setPrivateKey")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#privkey"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("val")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" signature "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" sign"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sign")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#input"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("val")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" CryptoJS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("SHA256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sha256"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[a("a",{attrs:{href:"'https://blog.csdn.net/jijianshuai/article/details/80582187'"}},[t._v("RSA 实现原理 🚀")])]),t._v(" "),a("h2",{attrs:{id:"md5-摘要"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#md5-摘要"}},[t._v("#")]),t._v(" MD5 摘要")]),t._v(" "),a("p",[a("code",[t._v("MD5")]),t._v("消息摘要算法（M"),a("code",[t._v("D5 Message-Digest Algorithm")]),t._v("），是在计算机领域被广泛使用的一种哈希算法，用来对信息进行完整性保护。"),a("code",[t._v("MD5")]),t._v(" 将一个任意长度的数据经过编码得到一个 128 位（16 字节）的哈希值，即为 "),a("code",[t._v("MD5")]),t._v(" 值。于 1992 年公开，用以取代 MD4 算法。")]),t._v(" "),a("p",[t._v("特点：")]),t._v(" "),a("ul",[a("li",[t._v("压缩性：任意长度的数据，算出的 MD5 值长度都是固定的。")]),t._v(" "),a("li",[t._v("易计算：从原数据计算出 MD5 值很容易。")]),t._v(" "),a("li",[t._v("抗修改性：对原数据进行任何改动，哪怕只修改 1 个字节，所得到的 MD5 值都有很大区别。")]),t._v(" "),a("li",[t._v("强抗碰撞：已知原数据和其 MD5 值，想找到一个具有相同 MD5 值的数据（即伪造数据）是非常困难的。")])]),t._v(" "),a("p",[t._v("应用场景：")]),t._v(" "),a("ul",[a("li",[t._v("防篡改，保障文件传输可靠性")]),t._v(" "),a("li",[t._v("增强密码保存的安全性")]),t._v(" "),a("li",[t._v("数字签名")])]),t._v(" "),a("p",[t._v("安全性：")]),t._v(" "),a("p",[a("code",[t._v("MD5")]),t._v("虽然被广泛应用，但仍存在弱点，可以被加以破解，"),a("code",[t._v("MD5")]),t._v("算法无法防止碰撞，并已有碰撞成功案例。对于需要高度安全性的数据，一般建议改用其他算法，如"),a("code",[t._v("SHA-2")]),t._v("等。目前互联网上已经有很多字符串与"),a("code",[t._v("MD5")]),t._v("的数据库，基本上可以认为没有加"),a("code",[t._v("SALT")]),t._v("的"),a("code",[t._v("MD5")]),t._v("值类似于裸奔了（"),a("a",{attrs:{href:"https://www.md5online.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("md5 逆向功能 🚀"),a("OutboundLink")],1),t._v("）")]),t._v(" "),a("h2",{attrs:{id:"生成随机密钥"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成随机密钥"}},[t._v("#")]),t._v(" 生成随机密钥")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getGeneralKey")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'abcdefghijklmnopqrstuvwxyz0123456789'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 先经过一层乱序")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" arr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("split")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sort")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("random")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" keyLen "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("32")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" aesKey "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 然后再随机生成秘钥")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" keyLen"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" temp "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("floor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("random")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("36")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      aesKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("temp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" aesKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);
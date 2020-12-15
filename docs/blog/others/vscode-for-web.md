# 搭建 web 版 vs code

> vs code 仓库地址：[https://github.com/microsoft/vscode](https://github.com/microsoft/vscode.git)

## 介绍

这里列一下各种工具的版本，可以先按照下列的版本进行安装。（很多时候往往是因为工具版本的差异导致运行失败）

```node
node:    v10.16.1
yarn:    v1.22.4
python:  v2.7.15
system:  win10 x64
```

首先 先安装 node（version >= 10.x， <= 12.x），然后按照 vscode 文档（[:raised_hands:这里](https://github.com/Microsoft/vscode/wiki/How-to-Contribute)）的步骤安装 `windows-build-tools`，

```node
➜  npm install --global windows-build-tools --vs2015
```

这里特地没有先安装 python，因为这个工具会自动帮你安装 python2.7。
接着安装 yarn，下载最新的 yarn 安装包，点击安装 next next next 就可以了。 [点击前往下载 yarn](http://yarnpkg.top/Installation.html)

最后再检查一下各个工具的版本，准备开搞。

## 安装步骤

### 第一步：当然是先安装依赖（这里巨坑:sweat_drops:）

```node
➜  vscode (master)   yarn
```

这里需要安装的依赖非常多，视网络情况大概 20-60 分钟不等。我用公司电脑安装依赖，因为有网络权限，所以网速很可观，大概 20 来分钟就安装完成了。

简单罗列一下遇到的问题，解决与未解决的都有

#### gyp ERR

![gyp ERR](https://github.com/Real102/resourceLibrary/raw/master/img/vscode/gypError.png 'gyp ERR')

这个问题相对好解决一些，直接重装一下 gyp

```node
➜  vscode (master)   node-gyp rebuild
```

#### vscode-ripgrep

![vscode-ripgrep](https://github.com/Real102/resourceLibrary/raw/master/img/vscode/vscode-ripgrep.png 'vscode-ripgrep')

也有可能会遇到这种情况，一直卡在下载 vscode-ripgrep 这里。在没有重装系统前，基本都是卡在这个阶段，一直下载不了。找 issue 也没有找到能解决的办法。后来想尝试用 docker 来跑，就换了个 win10 系统，安装 wsl 来跑。很失败，docker 安装不了:sob:，查了资料好像是说 wsl 不支持使用 docker，血崩:joy:！

不过好在又重新按照文档上的流程走了一遍，奇迹发生了，依赖下载成功了！:clap::clap::clap::cherry_blossom::cherry_blossom::cherry_blossom:

![yarn-build-successfully](https://github.com/Real102/resourceLibrary/raw/master/img/vscode/yarn-build-successfully.png 'yarn-build-successfully')

到这里已经是很不易了。此时心情非常 nice，迫不及待准备跑下一个命令

```node
➜  vscode (master)   yarn web
```

结果...还是失败了

```node
$ node scripts/code-web.js
Web UI available at   http://localhost:8080
Error: ENOENT: no such file or directory, stat 'E:\code\vscode\vscodeNew\out\vs\code\browser\workbench\workbench.js'
```

好吧，继续谷歌吧。到这里官方文档暂时就用不上了。
查了一会，发现运行 `yarn web` 前需要先 `gulp watch`，既然如此，那就试试吧

### 第二步： gulp 打包

```node
➜  vscode (master)   gulp watch
```

是的，没错，又出问题了

#### JS-stacktrace

![JS-stacktrace](https://github.com/Real102/resourceLibrary/raw/master/img/vscode/JS-stacktrace.png 'JS-stacktrace')

js 栈溢出了:sob:。查了一下，据说是 V8 引擎的问题。

记得好像是 issue 中也有提过，如果直接运行 `gulp watch` 的话可能会丢失后面的这个字段 `--max_old_space_size=4095` 导致栈溢出。所以换一下执行命令：

```node
➜  vscode (master)   npm run gulp --max_old_space_size=4095
```

![npm-run-gulp](https://github.com/Real102/resourceLibrary/raw/master/img/vscode/npm-run-gulp.png 'npm-run-gulp')

这里忽略重复的命令 `--max_old_space_size=4095` 不小心复制多了一份。

等了大概 2min 左右就运行完成了！

### 第三步，也是最后一步： yarn web！

```node
➜  vscode (master)   yarn web
```

![vscode](https://github.com/Real102/resourceLibrary/raw/master/img/vscode/vscode.png 'vscode')

完成！

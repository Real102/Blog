# 使用 nvm 来管理 npm

开发中可能会用到不同版本的 `npm`，这里推荐可以使用 `nvm` 来管理 `npm`👀

- 首先打开 [nvm GitHub 地址 🚀](https://github.com/coreybutler/nvm-windows/releases)，下载 `nvm` 安装包

![nvm 下载](https://github.com/Real102/resourceLibrary/raw/master/img/nvm/download.png "nvm 下载")

- 解压下载的 zip 包，然后点击安装即可。安装路径可以直接使用默认的，也可以自定义，然后一直 “下一步” 即可安装完成
- 打开 `powershell` (win + x)，输入 nvm，若出现下图即安装成功 💦

![nvm](https://github.com/Real102/resourceLibrary/raw/master/img/nvm/powershell.png "nvm")

- 执行命令如 `nvm install 10.16.1` 即可安装 `node10.16.1` 版本，如果需要安装多个版本，则执行多次即可 🌝
- 安装完成后可以执行 `nvm ls` 查看当前已安装的 `node` 版本（前面带 \* 即当前正在使用的版本）😋

![nvm](https://github.com/Real102/resourceLibrary/raw/master/img/nvm/nvm.png "nvm")

- 执行 `nvm use 10.16.1` 来切换 `node` 版本

至此已经完成 `nvm` 的安装 💨💨💨

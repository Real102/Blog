#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
# npm run docs:build

cp README.md docs/.vuepress/dist/

# 进入生成的文件夹
cd ./docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
# 未知原因：初始化后会自动删除用户信息，全局设置的也无效，这里手动添加后成功
git config user.name "wolfBerry"
git config user.email "906368017@qq.com"

git add -A
git commit -m 'deploy'
git remote add origin https://github.com/Real102/Blog.git
git push origin master -f

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:Real102/test_blob.git master:gh-pages

cd -

# 需要安装 Ubuntu 或其他 Linux 系统，否则无法使用 .sh 文件
# 文件换行符必须为LF模式
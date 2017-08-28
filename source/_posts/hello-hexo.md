---
title: 快速高效的 hexo 博客建站之旅 
date: 2017-08-09 12:32:33
tags: hexo
---

想体验免费建站，hexo 是个不错的选择，正如官方标语：

> **A fast, simple & powerful blog framework**

<!-- more -->

![hexo-on-github](hexo-on-github.png)

hexo 基于 NodeJS，核心作用是**将 Markdown 文件整合成可直接使用的静态网站文件结构**，简单高效，但需要一定的动手能力。以下是个人简要的上手流程，如有欠缺之处，以官方文档为主：[Hexo 官方中文主页](https://hexo.io/zh-cn/) 。

## Before

使用 Hexo 之前，首先要在本地装配 NodeJS 和 Git，且熟悉 Markdown 语法写作，以下是各项参考：

- NodeJS：[我的 NodeJS 起飞姿势](/2017/08/10/nodejs-run-first/)
- Git：[安装 Git 与配置公匙](/2017/08/10/git-run-first/)
- Markdown：[Markdown - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Markdown)

## 安装 hexo

在命令窗口下，使用 NodeJS 自带的包管理器 npm 全局安装 hexo 本地工具：

```shell
npm i -g hexo-cli
```

## 创建博客项目

切换到你要生成 Hexo 博客的目录，执行 Hexo 命令生成 `myblog` 项目文件夹，并切换至该文件夹安装 npm 依赖：

```shell
hexo init myblog
cd myblog
npm install
```

如果以上顺利，那么文件结构如下：

![hexo-des](hexo-des.png)

其中的配置并不复杂，具体可参考[我的 Hexo 博客项目源码](https://github.com/Aysnine/bnote)中的 `_config.yml` 文件。

## 运行博客

在创建好博客后，几乎不需要配置也能运行起来，在项目文件夹下执行：

```shell
hexo server
```

也可以简写为 `hexo s` ，启动完成后打开浏览器 `http://localhost:4000` 查看。此时命令行会挂起，`ctrl+c` 即可关闭服务器。

其中的原理只是借助 NodeJS 的 `http` 模块创建一个服务器，Hexo 默认使用 4000 端口。

## 调试博客

在调试时通常用：

```
hexo s --debug
```

这里推荐安装 Hexo 的实时刷新插件 `hexo-browsersync`，在项目下执行：

```
npm i hexo-browsersync --save
```

重新启动即可看到效果，使得文件改动时后台自动刷新。这样一边 `ctrl+s` 保存文章，另一边浏览器就可以即时预览。这是借助 NodeJS 的 `fs` 模块，以及开源 NodeJS 模块 [browser-sync](http://www.browsersync.cn/) 实现的。

到此，博客项目已经可以在本地跑起来，并且做到*即时预览*。光在本地跑肯定不够，还得部署到链接着公网的服务器才能分享。

## 部署到 Github Pages

如果不是经验老道的大佬，这会是个不错的选择，**它会为你省去服务器和域名的开销**，良心十足。

Github 作为大型开源代码托管平台，它提供 **静态站点托管服务** ，即 [Github Pages](https://help.github.com/articles/what-is-github-pages/) ，*建议在使用前先点进去看一眼说明书*。天下没有绝对免费的服务器，如果有，那必定又砍存储，又限带宽，甚至还出现流量不足。起初勉强能用就行，这都是后期要解决的。

首先需要注册一个 Github 账号并登录，打开 [主页面](https://github.com/) ，点击下图所示的新建仓库：

![new-repo](new-repo.png)


---
title: 快速高效的 Hexo 博客建站之旅 
date: 2017-08-09 12:32:33
tags: hexo
---

如果想来一手简单的免费建站体验，Hexo 是个不错的选择，正如官方的描述：

> **A fast, simple & powerful blog framework**

<!-- more -->

![hexo-on-github](hexo-on-github.png)

Hexo 是基于 NodeJS 的工具，其核心作用，是**将 Markdown 文件整合成一堆可直接发布的静态网页**，虽说简单高效，多少还是需要一定的动手能力，以下是简要的入手流程，如有不妥请参照 [Hexo 官方中文主页](https://hexo.io/zh-cn/) 。

## Before

在使用 Hexo 之前，首先要在本地装配 NodeJS 和 Git，详细过程可参考：

- NodeJS：[正确的 NodeJS 安装姿势](/2017/08/10/nodejs-run-first/)
- Git：[安装 Git 与配置公匙](/2017/08/10/git-run-first/)

## 安装 Hexo

打开命令行，最好全局安装 Hexo 工具：

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

## 配置 Github Pages

[未完.]

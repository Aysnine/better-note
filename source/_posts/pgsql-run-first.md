---
title: PostgreSQL 数据库入坑记
date: 2017-08-10 22:30:56
tags: 
---

在国内，MySQL 已是身经百战，而一款老牌 **开源** 数据库 PostgreSQL（简称pg） 在暗中磨砺许久，国内的云服务商也将其悄然上线了，作为关系型数据库中的一员，它到底有什么好？先来学习一个。

> **PostgreSQL: The world's most advanced open source database**

<!-- more -->

## Before

踩坑途中一波三折，以下是值得参考和学习的资料，**甚为重要** ：

### 必备资料

- [PostgreSQL 国际站点](https://www.postgresql.org/)
  - [下载及安装指南](https://www.postgresql.org/download/)
- [PostgreSQL 中文站点](http://postgres.cn)
  - [文档一览](http://postgres.cn/document)


### 学习资源

- 阿里云视频教程：[PostgreSQL 数据库从入门到精通](https://edu.aliyun.com/course/52) （需登录）
- 英文学习站点：[PostgreSQL Tutorial](http://www.postgresqltutorial.com)

### 资源集

- [PostgreSQL（数据库）资料](https://github.com/ty4z2008/Qix/blob/master/pg.md)
- [德哥 PostgreSQL 系列](https://github.com/digoal/blog/blob/master/README.md)


## CentOS 7 下安装 pg

先试着在 Linux 下安装，这里使用常见服务器类型的 CentOS 7，包管理器直装，非编译安装。

进入 [下载及安装指南](https://www.postgresql.org/download/) 页面，CentOS 属于 RedHat 的发行版，在页面中选择：

![download-pg](download-pg.png)

根据自己系统的情况调整这三个选项，下面的命令也会随之变化为符合所选系统的：

![install-pg](install-pg.png)

CentOS 7 以 yum 作为包管理器，在安装时需要 root 权限。按照以上几个简单的步骤，正常情况下安装没毛病。

## 配置用户

Draft

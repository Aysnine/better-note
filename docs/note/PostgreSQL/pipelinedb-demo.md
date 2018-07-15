# 使用 PipelineDB 做大数据流式计算：统计、分析与预警

基于 PostgreSQL 源码二次开发，PipelineDB 是针对流式数据统计分析的数据库，即 PostgreSQL 的扩展版本。
直到版本 0.9.9 ，PipelineDB 一直作为类 PostgreSQL 数据库存在。
下个版本，PipelineDB 将作为 PostgreSQL 的插件存在，与特有功能相关的语法会标准化，具体内容请查阅
[官方博客](https://www.pipelinedb.com/blog/pipelinedb-0-9-9-one-more-release-until-pipelinedb-is-a-postgresql-extension)。

## 应用场景



## 使用 Docker 快速上手

``` bash
docker run \
  -v ~/my/data:/dev/shm \ # 指定数据卷
  -p 5432:5432 \          # 设置端口映射
  pipelinedb/pipelinedb   # 使用官方镜像
```

[参考官方文档](http://docs.pipelinedb.com/installation.html#docker)

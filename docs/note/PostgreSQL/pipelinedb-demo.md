# 使用 PipelineDB 做大数据流式计算：统计、分析与预警

基于 PostgreSQL 源码二次开发，PipelineDB 是针对流式数据统计分析的数据库。
直到版本 0.9.9 ，PipelineDB 一直作为类 PostgreSQL 数据库存在。
下个版本，PipelineDB 将作为 PostgreSQL 的插件存在，相关的语法会标准化，具体内容请查阅
[官方博客](https://www.pipelinedb.com/blog/pipelinedb-0-9-9-one-more-release-until-pipelinedb-is-a-postgresql-extension)。

## 使用场景



## 使用 Docker 快速上手

``` bash
docker run -v /dev/shm:/dev/shm pipelinedb/pipelinedb
```

[参考](http://docs.pipelinedb.com/installation.html#docker)

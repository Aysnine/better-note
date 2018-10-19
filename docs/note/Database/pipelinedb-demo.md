# 使用 PipelineDB 流计算，实现数据实时统计

什么是流计算？这里有一个小例子。

在数据库中有一张员工表 `staff`，字段有姓名 `name`、薪资 `salary`，查询平均薪资如下

```sql
select avg(salary) from staff;
```

PipelineDB 是类 PostgreSQL 数据库

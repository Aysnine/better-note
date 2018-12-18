# PipelineDB 流计算：物联网数据统计

> PipelineDB 是类 PostgreSQL 数据库，所以 PostgreSQL 中的功能也是可用的，但请注意自己的 PipelineDB 是基于哪个 PostgreSQL 版本。

什么是流计算？这里针对物联网方面的数据处理，有一个小例子。

某校给每间学生寝室安装了智能热水器，共 100 个按 1~100 编号，热水器可以根据自身情况，灵活上传实时功耗。

**常规的例子**，**智能热水器实时数据**表 `heater_online` 测试 SQL 如下：

```sql
-- 清理旧数据，释放磁盘空间
DROP TABLE IF EXISTS heater_online;

-- 创建 智能热水器实时数据 表
CREATE TABLE heater_online (
	id VARCHAR(64), --  设备编号
	tdp NUMERIC(32, 2), -- 功耗
	t TIMESTAMP DEFAULT LOCALTIMESTAMP -- 数据上传时间
);

-- 插入 1000w 条测试数据
-- 从 5 年前开始，100 个设备随机上传数据
INSERT INTO heater_online
SELECT
	( random() * 99 ) ::INT +1 AS id,
	random() ::NUMERIC( 32, 2 ) AS tdp,
	LOCALTIMESTAMP - INTERVAL '5 year' + (s.i * 15.7 || 's')::INTERVAL
FROM
	generate_series ( 1, 10000000 ) AS s ( i ); -- ! 会产生 500M 左右的数据

-- 统计每个设备的上传次数、总功耗
SELECT
	id,
	COUNT( * ) times,
	SUM ( tdp ) tdp_sum
FROM
	heater_online
GROUP BY id;

-- 查看最后一条数据
SELECT * FROM heater_online ORDER BY t DESC LIMIT 1;
```

此处的统计求平均，导致每次查询，数据库都要去重新计算所有员工 `salary` 之和，再除以人数而得。
当员工数量上涨，这个统计速度也会变慢。统计语句，我的笔记本大概用了 3s 完成。

**🤔 数据库好笨，不会给统计数据的计算内容做个缓存吗？**

下面用 PipelineDB 的方式来解决这个问题：

```sql
-- 清理旧数据，释放磁盘空间
DROP CONTINUOUS VIEW IF EXISTS state_heater_online;
DROP STREAM IF EXISTS io_heater_online;

-- 创建流，可看作数据入口，一张只需要插入数据的表
CREATE STREAM io_heater_online (
	id VARCHAR(64), --  设备编号
	tdp NUMERIC(32, 2), -- 功耗
	t TIMESTAMP -- 数据上传时间，注意不能 default
);

-- 创建统计视图，类似于创建视图
CREATE CONTINUOUS VIEW state_heater_online AS
SELECT
	id,
	COUNT( * ) times,
	SUM ( tdp ) tdp_sum
FROM
	io_heater_online
GROUP BY id;

-- 向流插入一千万条随机数据
INSERT INTO io_heater_online
SELECT
	( random() * 99 ) ::INT +1 AS id,
	random() ::NUMERIC( 32, 2 ) AS tdp,
	LOCALTIMESTAMP - INTERVAL '5 year' + (s.i * 15.7 || 's')::INTERVAL
FROM
	generate_series ( 1, 10000000 ) AS s ( i ); -- ! 会产生 500M 左右的数据

-- 直接从统计视图查询统计的结果
SELECT * FROM state_heater_online;
```

PipelineDB 的思想，就是先定义好数据的入口，也就是创建流，然后基于流，把统计的 SQL 语句创建成 CONTINUOUS VIEW。
当有数据插入流，PipelineDB 会去更新相关的 CONTINUOUS VIEW，所用时间几乎是恒定的，毫秒级别，因为统计已经在数据插入的时候完成了合并计算。

<PrettyComment />

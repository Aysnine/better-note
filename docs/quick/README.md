---
sidebar: auto
---

# 速食记

::: tip
将零散的代码、知识放置于此，便于在日常使用中查找
:::

## 便于调试正则表达式的小型 js 测试代码

```js
(function (r){
	[
        // [正确结果, 测试用的字符串]
		[false, '123,'],
		[true, '123.1'],
		[true, '0.4,0.5,0.66']
        // ... 添加测试项
	].map(i => { // 使用正则对象的 test 方法测试
		console.log(r.test(i[1])===i[0] ? '✔️':'❌', i[0], i[1])
	})
})( /^(\d+(\.\d+)?)(\,\d+(\.\d+)?)*$/ ) // 编辑正则
```

## 安装 Docker 可视化 Web 工具：Portainer

```bash
$ docker volume create portainer_data
$ docker run -d -p 80:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

[参考文档](https://portainer.readthedocs.io/en/latest/deployment.html#quick-start)

## ~~vue 项目的 lint 误报 pug 语法错误~~

对 template 进行 lint，如果用 pug 写，会出现辣鸡的 lint 警告，
千万别 fix，暂时先忽略对 template 的 lint 吧。

如 `App.vue`：

```vue {1}
<!-- prettier-ignore -->
<template lang="pug">
  #app
    img(alt='Vue logo', src='./assets/logo.png')
    hello-world(msg='Welcome to Your Vue.js App')
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

这个问题是 Prettier 的锅，已经修好了，忽略不支持的语言：[prettier/prettier#5388](https://github.com/prettier/prettier/pull/5388)

```

## vue-cli3 项目中添加 pug 支持

在项目中安装 `pug`、`pug-plain-loader` 依赖即可

```bash
yarn add pug pug-plain-loader -D
```

## VeryNginx 开启 Gzip

[官方文档](https://github.com/alexazhou/VeryNginx/blob/master/readme_zh.md#%E7%BC%96%E8%BE%91-nginx-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)指明了
配置文件的位置，将 `/opt/verynginx/openresty/nginx/conf/nginx.conf` 中被注释的 `gzip` 打开即可：

```nginx {3}
    # ...

    gzip  on;

        #this line shoud be include in every http block
    include /opt/verynginx/verynginx/nginx_conf/in_http_block.conf;

    server {
        listen       80;

        #this line shoud be include in every server block
        include /opt/verynginx/verynginx/nginx_conf/in_server_block.conf;

        location = / {
            root   html;
            index  index.html index.htm;
        }
    }

    # ...
```

## vue-cli3 项目配置 stylus nib

安装依赖：

```bash
yarn add nib
```

在 `vue.config.js` 文件中加入相关 Loader 配置：

```js {2-10}
module.exports = {
    css: {
        loaderOptions: {
            // see doc here http://stylus.github.io/nib/
            stylus: {
                use: [require('nib')()],
                import: ['~nib/lib/nib/index.styl']
            }
        }
    }
}
```

## CentOS 7 的 NodeJS 环境布置

以 node 8x 为例
```bash
# 卸载旧的
yum erase nodejs node -y
# 设置 nodesource 源
curl -sL https://rpm.nodesource.com/setup_8.x | bash -
# 安装新的
yum install nodejs -y
# 设置淘宝 npm 源
npm config set registry https://registry.npm.taobao.org
```

## NodeJS 安装常用的 cli

```bash
# vue-cli3 脚手架，new
# react 脚手架
# angular 脚手架，new
npm i -g yarn @vue/cli create-react-app @angular/cli 
```

## CentOS 7 安装 VeryNginx 的坑

如果安装时报 `not fount`，肯定是少了依赖，那就把这几个装上：

```
yum install gcc pcre pcre-devel openssl openssl-devel -y
```

还需要一个名为 `nginx` 的用户，可以创建，也可以改 `/opt/verynginx/openresty/nginx/conf/nginx.conf` 里的 `user` 名。

以下是使用操作：

```bash
#启动服务
/opt/verynginx/openresty/nginx/sbin/nginx

#停止服务
/opt/verynginx/openresty/nginx/sbin/nginx -s stop

#重启服务
/opt/verynginx/openresty/nginx/sbin/nginx -s reload
```

为了方便，建立一个链接：

```bash
ln -s /opt/verynginx/openresty/nginx/sbin/nginx /usr/local/bin/nginx
```
这样就可以愉快地使用 `nginx` 命令了

## Docker 启动 MySQL

MySQL 5.7

```bash
docker run \ 
    --name mysql57 \ # 容器别名
    -e MYSQL_ROOT_PASSWORD=scitc2018 \ # root 用户密码
    -e MYSQL_DATABASE=scitc \ # 默认创建的库
    -e MYSQL_USER=scitc \ # 默认创建的用户
    -e MYSQL_PASSWORD=scitc2018 \ # 默认创建的用户的密码
    --character-set-server=utf8mb4 \ # 默认字符集
    --collation-server=utf8mb4_unicode_ci \ # 默认字符集
    --lower_case_table_names \ # 使用全小写表名，避免 linux 服务器上区分大小写
    --restart=always \ # 跟随 Docker 自启动
    -p 3316:3306 \  # 端口映射，本机端口:容器端口
    -d \      # 后台运行
    mysql:5.7 # 官方 5.7
```

## CentOS 7 安装最新版 FFmpeg

以 x86_64 release 版本为例：

```bash
mkdir ffmpeg-install
cd ffmpeg-install
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-64bit-static.tar.xz
tar xvf ffmpeg-release-64bit-static.tar.xz # 解压
```

此时 `ffmpeg-install` 文件夹下出现最新版本解压后的文件夹，文件夹名字带版本号，以实际情况为准，**切换至解压出的文件夹下**，执行命令：

```bash
cp ffmpeg ffprobe /usr/local/bin/
```

可执行文件有两个，使用以上命令复制到 `bin` 目录下，就能使用 `ffmpeg` 命令。

如需卸载，直接删除这两个文件：

```bash
rm /usr/local/bin/ffmpeg /usr/local/bin/ffprobe
```

安装获取：[FFmpeg Static Builds](https://johnvansickle.com/ffmpeg/)

官方指南：[FFrequently Asked Questions](https://www.johnvansickle.com/ffmpeg/faq/)

## curl 快速测试 url 并查看返回头

```bash
curl -I https://example.com   # 只获取请求/响应头

# HTTP/1.1 200 OK
# Content-Encoding: gzip
# Accept-Ranges: bytes
# Cache-Control: max-age=604800
# Content-Type: text/html
# Date: Sat, 21 Jul 2018 15:52:41 GMT
# Etag: "1541025663"
# Expires: Sat, 28 Jul 2018 15:52:41 GMT
# Last-Modified: Fri, 09 Aug 2013 23:54:35 GMT
# Server: ECS (oxr/8313)
# X-Cache: HIT
# Content-Length: 606
```

## vue-cli3 之 ESlint & Prettier 配置

将 **package.json** 的 `eslintConfig` 配置成如下即可，其它配置文件同理：

```json
{
    "eslintConfig": {
        "root": true,
        "env": {
            "node": true
        },
        "extends": [
            "plugin:vue/essential",
            "@vue/prettier"
        ],
        "rules": {
            "prettier/prettier": [
                "warn",
                {
                    "singleQuote": true,
                    "semi": false,
                    "trailingComma": "none"
                }
            ]
        },
        "parserOptions": {
            "parser": "babel-eslint"
        }
    }
}
```

- `"warn"` 使用警告作为提示
- `"singleQuote"` 是否用单引号
- `"trailingComma"` 是否用分号

更多 Prettier 选项参考：[Options · Prettier](https://prettier.io/docs/en/options.html)

## JavaScript 小技巧

```js
// 取当前时间戳
+new Date()         // 1531369989992
// 浮点数去除小数位（！非四舍五入）
~~132.456           // 132
```

## Nginx 常用命令

```bash
nginx -s stop       # 停止
nginx -s reopen     # 重开
nginx -s reload     # 重载配置
nginx -s quit       # 退出
nginx -t            # 检查配置文件格式
nginx -T            # 检查配置文件格式，确认正确再载入配置
nginx -c file       # 指定载入配置文件
nginx -h            # 查看帮助
nginx -v            # 查看版本
nginx -V            # 查看版本及配置
```

## Nginx HTTP 反向代理配置

`vi /etc/nginx/nginx.conf`

```nginx
http {
    # Example proxy for http://example.cnine.me to this server:80
    server {
        listen          80 default_server;
        listen          [::]:80 default_server;
        server_name     example.cnine.me;
        location / {
            proxy_pass              http://example.cnine.me:80;
            proxy_set_header        X-Real-IP $remote_addr;
            proxy_set_header        Host $host;
            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

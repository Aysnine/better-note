---
sidebar: auto
---

# 速食记

::: tip
小知识速记，将零散的小知识堆积于此
:::

## CentOS 7 快速安装最新版 FFmpeg

以 x86_64 release 版本为例：

```shell
mkdir ffmpeg-install
cd ffmpeg-install
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-64bit-static.tar.xz
tar xvf ffmpeg-release-64bit-static.tar.xz # 解压
```

此时 `ffmpeg-install` 文件夹下出现最新版本解压后的文件夹，文件夹名字带版本号，以实际情况为准，**切换至解压出的文件夹下**，执行命令：

```shell
copy ffmpeg ffprobe /usr/local/bin/
```

可执行文件有两个，上述命令将其复制到 `bin` 目录下，即可使用 `ffmpeg` 命令。

卸载也就简单了，直接删除这两个文件：

```shell
rm /usr/local/bin/ffmpeg /usr/local/bin/ffprobe
```

安装获取：[FFmpeg Static Builds](https://johnvansickle.com/ffmpeg/)

官方指南：[FFrequently Asked Questions](https://www.johnvansickle.com/ffmpeg/faq/)

## curl 快速测试 url 请求信息

```shell
curl -I https://example.com   # 只返回请求/响应头，便于 url 试探，丢弃 body 部分以节省时间

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

## vue-cli 项目的 ESlint & Prettier 配置

此为 **package.json**，其它配置文件同理

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
// 浮点数去除小数位（非四舍五入）
~~132.456           // 132
```

## Nginx 常用命令

```shell
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

## Nginx 反向代理配置

`vi /etc/nginx/nginx.conf`

```
...
http {
    ...
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
    ...
}
...
```

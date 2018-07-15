---
sidebar: auto
---

# 速食记

::: tip
小知识速记，将零散的小知识堆积于此
:::

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

```sh
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

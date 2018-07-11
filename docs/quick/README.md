---
sidebar: auto
---

# 速食记

## Nginx 常用命令

- `nginx -s stop` 停止
- `nginx -s reopen` 重开
- `nginx -s reload` 重载配置
- `nginx -s quit` 退出
- `nginx -t` 检查配置文件格式
- `nginx -T` 检查配置文件格式，确认正确再载入配置
- `nginx -c file` 指定载入配置文件

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

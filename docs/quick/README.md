---
sidebar: auto
---

# 速食记

::: tip
将零散的代码、知识放置于此，便于在日常使用中查找
:::

## mac 食用 oh-my-zsh

安装 `zsh`：

``` bash
brew install zsh
```

安装 `ohmyzsh`：

``` bash
cd ~ ; sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

可能需要忽略权限问题，详见 [oh-my-zsh/issues/6835](https://github.com/robbyrussell/oh-my-zsh/issues/6835#issuecomment-390216875)，
在 `~/.zshrc` **文件顶部添加**：

``` bash
ZSH_DISABLE_COMPFIX=true
```

配置命令高亮、自动补全和输入建议等好用的插件，先下载插件到插件目录：

``` bash
cd ~/.oh-my-zsh/custom/plugins/
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
git clone https://github.com/zsh-users/zsh-completions.git
git clone https://github.com/zsh-users/zsh-autosuggestions.git
```

在 `~/.zshrc` 的 plugins 中加入配置：

``` bash
plugins=(
        git
        brew
        zsh-syntax-highlighting
        zsh-completions
        zsh-autosuggestions
)
```

## antd：使用 dayjs 替换 moment

dayjs 是 moment 的轻量化方案，给前端打包瘦身：[参考](https://github.com/iamkun/dayjs/issues/529#issue-419198101)

## yarn 更新项目依赖

自动列出可更新的依赖，勾选项进行升级：

``` bash
yarn upgrade-interactive
```

## node: stdout is not a tty

偶然在 windows 下使用 git-bash，也就是 minitty 终端，执行:

``` bash
node -v | echo
# 或 echo `node -v`
```

输出 `stdout is not a tty`，猜测是终端在 windows 上水土不服，但是可以通过包一层 sh 去解决这个问题：

``` bash
sh -c 'node -v' | echo
```

相关资料：
- [sh 包裹方式](https://stackoverflow.com/questions/45112889/bash-node-js-stdin-stdout-redirection-error-not-a-tty)
- [设置为 cmd 输出](https://stackoverflow.com/questions/45890339/stdout-is-not-a-tty-using-bash-for-node-tape-tap-spec)

## ffmpeg 下载 m3u8 视频

``` bash
ffmpeg -i [地址] -c copy [文件名].mkv
```

- 地址即 m3u8 文件地址，如 `http://xxx.com/path/to/index.m3u8`
- 使用 mkv 格式存储最好，此格式相当于图片中的 png，万金油

使用 nohup 实现后台下载：

``` bash
nohup ffmpeg -i [地址] -c copy [文件名].mkv &
```

## knex 连接 oracle 的问题

[knex](https://knexjs.org) 可以用于 nodejs 后端开发，连接各种主流数据库，并进行增删改查操作，链式语法。
但是[官方文档](https://knexjs.org/#Installation-client)并没有提供连接 oracle 的例子，除了 [node-oracledb 安装文档](https://oracle.github.io/node-oracledb/INSTALL.html#quickstart) 所需的宿主机环境依赖，还需要特殊的连接配置，
在 [oracle/node-oracledb](https://github.com/oracle/node-oracledb) 的 [api文档](https://oracle.github.io/node-oracledb/doc/api.html) 里有相关配置示例，
其中 connection 对象如下：

``` js
{
    user          : "hr",
    password      : "welcome",
    connectString : "localhost/XEPDB1" // host[:port]/DB
}
```

不同于其他数据库的 connection 对象，oracle 的只有 `user`、`password`、`connectString`，
一定要注意 `connectString` 末尾的大小写。

## zsh 报错： compaudit

最近登陆 CentOS7 的 root 用户，因为装了 zsh + antigen，报错：

> zsh compinit: insecure directories, run compaudit for list.
> Ignore insecure directories and continue [y] or abort compinit [n]? ncompinit: initialization aborted

其实是因为可执行文件权限受阻，根据命令提示，在用户的 home 目录使用  `compaudit` 命令，就可以查看哪些目录权限有问题：

```
~ # compaudit
There are insecure directories:
/root/.antigen/bundles/robbyrussell/oh-my-zsh/lib
/root/.antigen/bundles/robbyrussell/oh-my-zsh/plugins/git
/root/.antigen/bundles/zsh-users/zsh-syntax-highlighting
/root/.antigen/bundles/zsh-users/zsh-autosuggestions
/root/.antigen/bundles/zsh-users/zsh-completions
/root/.antigen/bundles/zsh-users/zsh-completions/src
/root/.antigen/bundles/robbyrussell/oh-my-zsh
/root/.antigen/bundles/robbyrussell/oh-my-zsh/plugins
/root/.antigen/bundles/zsh-users
/root/.antigen/bundles/zsh-users
/root/.antigen/bundles/zsh-users
/root/.antigen/bundles/zsh-users/zsh-completions
```

因为使用的 antigen，所有 `.antigen` 目录下的文件权限都有问题，接下来改权限：

``` bash
chmod -R 755 ~/.antigen/*
```

## Laravel 配置基础扩展

初入手遇到如下错误：

> the requested PHP extension fileinfo is missing from your system.
> 
> $ php --ini
> Configuration File (php.ini) Path: C:\WINDOWS
> Loaded Configuration File:         C:\tools\php72\php.ini
> Scan for additional .ini files in: (none)
> Additional .ini files parsed:      (none)

在 php.ini 末尾添加相关扩展，解决问题：

``` ini
extension=php_fileinfo.dll
```

## composer repo 加速下载

类似于 npm 在国内有淘宝撑着，让国内的开发者能快速安装依赖，composer 也需要根据国情来配置相应的加速源。

以下命令全局修改 repo (npm 里叫 registry，composer 的叫 repo，emmm......) ，选其一即可:

``` bash
# phpcomposer
composer config -g repo.packagist composer https://packagist.phpcomposer.com

# laravel 中国提供
composer config -g repo.packagist composer https://packagist.laravel-china.org
```

嫌麻烦还可以用 crm (类似于 npm 中的 [nrm](https://github.com/Pana/nrm), emmm......) 切换源:

``` bash
# 全局安装 crm，建议先运行上面的修改源的命令，因为这里涉及包下载，很慢
composer global require slince/composer-registry-manager

# 查看内置源
composer repo:ls

# 切换源，输入数字确认
composer repo:use
```

## choco 快速安装 php、composer

在 windows 上开发 php，如果自己去下载，手动安装，挺麻烦的，
windows 下有 [Chocolatey](https://chocolatey.org/) 这种包管理器，
和其他语言的包管理器神似。

打开 powershell，运行以下命令，默认安装较新的 php、composer：

``` shell
choco install php composer -y
```

对了，[Composer](https://github.com/composer/composer) 是 php 的包管理器。

## vue-cli3 项目配置正向代理

这里是利用开发时自带的 devServer 进行正向代理，环境生产中请自行配置后端正向代理，如 Nginx 之类的。

`vue.config.js`：

``` js {4-11}
module.exports = {
    devServer: {
        proxy: {
            /*
                '/cors/zhihu/xxx' => 'https://www.zhihu.com/xxx'
            */
            '/cors/zhihu': {
                target: 'https://www.zhihu.com',
                changeOrigin: true,
                pathRewrite: { '^/cors/zhihu': '' }
            }
        }
    }
}
```

## MySQL 获取常见日期

``` sql
SELECT

	# 今天的日期
	CURDATE() AS '今天的日期',
	
	# 本月第一天
	DATE_ADD(CURDATE(), INTERVAL - DAY (CURDATE()) + 1 DAY) AS '本月第一天',
	
	# 本季度第一天(农历)
	DATE(CONCAT(YEAR(CURDATE( ) ),'-',(
		IF(FLOOR( MONTH ( CURDATE( ) ) / 3 ) > 0, FLOOR( MONTH ( CURDATE( ) ) / 3 ), 4)*3
	) + '','-','1')) AS '本季度第一天(农历)',
	
	# 本季度第一天(数学)
	DATE(CONCAT(YEAR(CURDATE()), '-', (FLOOR(MONTH(CURDATE())/3)*3+1), '-', '1' )) AS '本季度第一天(数学)',
	
	# 本年第一天
	DATE_SUB(CURDATE(), INTERVAL DAYOFYEAR (NOW()) - 1 DAY) AS '本年第一天'
;
```

## axios 向 SpringBoot 传递表单数组

前端：

```js {9}
import qs from 'qs'
import axios from 'axios'

axios
    .post(
        '/api', 
        qs.stringify(
            { list: [1, 2, 3] },
            { arrayFormat: 'repeat' } // ! 主要是用 qs 格式化表单数据，数组要设置成 repeat 格式
        ) // => 'list=1&list=2&list=3'
    )
```

后端：

```java {6}
@RestController
public class ApiController {

    @RequestMapping("/api")
    public void api(
        @Param("list[]") Integer[] list // 这样写注解，来接收数组
    ) {
        // ...
    }
}
```

## bootstrap-vue 组件图片资源引用问题

使用 bootstrap-vue 的图片相关组件，不像普通的 `<img src="@/assets/logo.png">`，能智能引用资源，
所以要在 loader 配置加选项。

在官方找到了解决方法：[bootstrap-vue/bootstrap-vue#1982](https://github.com/bootstrap-vue/bootstrap-vue/issues/1982#issuecomment-410534278)，
以下是 vue-cli3 的配置方式： `/vue.config.js` ：

```js {3-20}
module.exports = {
    chainWebpack: config => {
        /* for bootstrap-vue */
        config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options['transformAssetUrls'] = {
					img: 'src',
					image: 'xlink:href',
					'b-img': 'src',
					'b-img-lazy': ['src', 'blank-src'],
					'b-card': 'img-src',
					'b-card-img': 'img-src',
					'b-carousel-slide': 'img-src',
					'b-embed': 'src'
				}
				return options
			})
    }
}
```

## 调试正则的小型 js 测试框架代码

每次调试正则，都是个繁杂的过程，这里提供一个测试代码，将要测试的字符串和期待的结果，成对填入数组，
然后编辑下方正则，代码运行后自动打印出每项的测试结果，保障正则的正确匹配。

把代码贴到浏览器的 console 里调试就行了：

```js
(function (r){
	[	// [正确结果, 测试用的字符串]
		[false, '123,'],
		[true, '123.1'],
		[true, '0.4,0.5,0.66']
		// ... 添加测试项
	].map(i => { // 使用正则对象的 test 方法去匹配
		console.log(r.test(i[1])===i[0] ? '✔️':'❌', i[0], i[1])
	})
})( /^(\d+(\.\d+)?)(\,\d+(\.\d+)?)*$/ ) // 编辑正则
```

## Docker Web 可视化：Portainer

```bash
$ docker volume create portainer_data
$ docker run --name portainer \
	-p 80:9000 \
	--restart always \
	-v /var/run/docker.sock:/var/run/docker.sock \
	-v portainer_data:/data \
	-d portainer/portainer
```

[参考文档](https://portainer.readthedocs.io/en/latest/deployment.html#quick-start)

## vue 项目的 lint 误报 pug 语法错误

**这个问题是 Prettier 的锅**，已经修好了，忽略不支持的语言：[prettier/prettier#5388](https://github.com/prettier/prettier/pull/5388)

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
	--name mysql57_mine \
	-e MYSQL_ROOT_PASSWORD=mine2018 \
	-e MYSQL_DATABASE=mine2018 \
	-e MYSQL_USER=mine2018 \
	-e MYSQL_PASSWORD=mine2018 \
	--restart=always \
	-p 3306:3306 \
	-d \
	mysql:5.7 \
	--lower_case_table_names \
	--character-set-server=utf8mb4 \
	--collation-server=utf8mb4_unicode_ci 
```

- `--name mysql57_mine` 容器实例别名
- `-e MYSQL_ROOT_PASSWORD=mine2018` * root 密码
- `-e MYSQL_DATABASE=mine2018` * 默认创建的库
- `-e MYSQL_USER=mine2018` 默认创建的用户
- `-e MYSQL_PASSWORD=mine2018` 默认创建的用户的密码
- `--restart=always` * 总是跟随 docker 自启
- `-p 3306:3306` * 端口映射，本机端口:容器端口
- `-d` 后台运行
- `mysql:5.7` 常用版本
- `--lower_case_table_names` 使用全小写表名，避免 linux 服务器上区分大小写
- `--character-set-server=utf8mb4` 默认字符集
- `--collation-server=utf8mb4_unicode_ci` 默认字符集

## CentOS 7 安装最新版 FFmpeg

以 x86_64 release 版本为例，**请注意文件名版本**：

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

<PrettyComment />

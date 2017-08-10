# bnote
BLOG SOURCE by Hexo -- save config and posts for build &amp; deploy

## Install

Install from the source repo

```shell
git clone https://github.com/Aysnine/bnote
cd bnote # for following operations
```

## Push

Push the config or posts, from local to origin repo, for update the source repo

```shell
git add .
git commit -m "source changes"
git push
```

## Pull

Update local repo

```shell
git pull
```

## Server

- As a local server with cmd

  ```shell
  hexo server # short like: hexo s
  ```

  or debug mode

  ```shell
  hexo server --debug
  ```

- As a backgrund server with pm2 **(Only Linux)**

  ```shell
  npm run pm2
  ```

  or

  ```shell
  pm2 start ecosystem.config.js
  ```

  set env in `ecosystem.config.js` for custom

  ```javascript
  module.exports = {
    apps : [
      {
        name      : 'bnote',
        script    : './bin/pm2',
        env: {
          PORT: 7223
        }
      }
    ]
  };
  ```



## Github Pages

[aysnine.github.io](https://aysnine.github.io)

### Deploy into Github Pages

Install pugin

```shell
npm i -save hexo-deployer-git
```

ssh access

- step1: set git **(if `id_rsa` is exist, to step 3)**

  ```shell
  git config --global user.name "test"
  git config --global user.email "your@email.example"
  ```


- step2: new a ssh-key in local machine, got files: `id_rsa` `id_rsa.pub` **(Linux Shell)**

  ```shell
  ssh-keygen -t rsa -C "your@email.example" # for enter
  ```

- step3: copy the content of `id_rsa.pub` to Github -> Settings -> SSH and GPG keys

- step4: test connection in local machine

  ```shell
  ssh git@github.com
  ```

set the `_config.yml` of this source project, and deploy

```shell
hexo deploy # short like: hexo d
```


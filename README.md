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

[enter](https://aysnine.github.com)
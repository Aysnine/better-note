# Webpack 下，源码文件获取自身路径

基于 Webpack 构建的项目中，如何在 `.vue`、`.js` 等源码文件中，获取到其自身的源码文件路径？

通常在编写用 NodeJS 运行的代码时，可以通过 `__filename`、`__dirname` 等变量，获取到当前源码的路径信息。而在 Webpack 的眼中，每个 `.js`、`.ts`、`.vue` 的源码文件可以看作一个 js 模块，那仍然有 `__filename`、`__dirname` 这种东西吗？

在源码中试一试，如：`src/pages/hello.vue`
```vue
<script>
console.log(__filename, __dirname) // 期望中应该得到 src/pages/hello.vue?xxx 这种格式的路径
export default {
    // ...
}
</script>
```

但实际输出的结果为 `/index.js`、`/` 之类的无关路径，看来有点问题。不过在 Webpack 的 issues 下找到了线索：
[webpack/webpack#1599](https://github.com/webpack/webpack/issues/1599#issuecomment-186841345)

看来踩到这个坑的人不少，解决方法如下，摘自这个 issues 中一位老哥的代码，也就是修改 Webpack 配置，大概如下：

```js
// the webpack config just works
target: 'node',
node: {
  __dirname: false,
  __filename: false,
}
```

这样一来，`__filename`、`__dirname` 就能正常使用了，但由于各种 Webpack 集成化环境的配置方式有所不同，还需根据自己项目的情况进行以上配置。

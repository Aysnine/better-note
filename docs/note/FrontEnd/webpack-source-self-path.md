# Webpack 下，源码文件获取自身路径

如何在基于 Webpack 构建的项目下，在 `.vue`、`.js` 等文件中获取到文件自身的路径？

在编写用 NodeJS 运行的代码时，能通过 `__filename`、`__dirname` 等变量，获取到当前文件的路径信息。

而在 Webpack 的眼中，每个 `.js`、`.ts`、`.vue` 的源码文件可以看作一个 js 模块，那 `__filename`、`__dirname` 能正常使用吗？

如：`src/pages/hello.vue`
```vue
<script>
console.log(__filename, __dirname) // 应该得到 src/pages/hello.vue?xxx 这种格式的路径
export default {
    // ...
}
</script>
```

但是实际输出的结果为 `/index.js`、`/` 之类的，看来有点问题，但是在 Webpack 的 issues 下有线索：
[webpack/webpack#1599](https://github.com/webpack/webpack/issues/1599#issuecomment-186841345)

看来踩到这个坑的人不少，解决方法如下，摘自这个 issues 中一位老哥的代码，根据项目情况来配置 Webpack 吧：

```js
// the webpack config just works
target: 'node',
node: {
  __dirname: false,
  __filename: false,
}
```

这样一来，`__filename`、`__dirname` 就能正常使用了。

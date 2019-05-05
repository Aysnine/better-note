# 如何获取 vue 单文件自身源码路径

这个问题要从一个想法说起。

[D2Admin](https://github.com/d2-projects/d2-admin) 是一个开源的，前端中后台集成方案，原先是基于 vue-cli2，大概是向 vue-cli3 过渡时，
作者老李，想在页面右下角加个 Toggle 点击，跳到当前页面源码对应的 github 页面。

确实很实用的功能，D2Admin 的 Demo 页面太多了，想看某个页面的源码，对于不熟悉项目目录结构的新手很不友好。

这些页面统一为 `.vue` 组件，那么转换一下：如何获取 vue 单文件自身源码路径？

目前经历了三个方案，最终目标是把自身路径赋值到 `this.$options.__source` 上。目前方案 3 是最新的。

## 方案 1 ：node + __filename

直接使用 node 中的 `__filename` 变量：

``` vue
<template>
  <h1>{{ $options.__source }}</h1>
</template>

<script>
export default {
  mounted() {
    this.$options.__source = __filename
  }
}
</script>
```

因为 webpack 编译时，会把源码文件在内部转为 node 模块，`.vue` 文件中的 script 内容也被转换了，
其中的 `__filename` 在编译时被运行，直接得到当前文件自身路径。

使用这个变量还需要在 webpack 配置中启用 `node.__filename`：

``` js
/* vue.config.js */
module.exports = {
  // ...
  chainWebpack: config => {
    // ...
    config.node
      .set('__dirname', true) // 同理
      .set('__filename', true)
  }
};
```

### 缺点

- 要在每个组件里手动赋值，还不能用 mixin
- `__filename` 得到的路径在部分 `.vue` 文件下并不准确，路径可能还会带附带 querystring

*一开始，坚强的老李用这个方式，给上百个组件手动挂上了路径，但总比手动写死每个路径要好*

## 方案 2 ：vue-loader + exposeFilename

在 loader 层面，其实 `vue-loader` 提供了一个 `exposeFilename` 选项，只要启用，
就会给每个 `.vue` 组件带上 `this.$options.__file`，上面有准确的路径。

这样只需要改 loader 配置：

``` js
/* vue.config.js */
module.exports = {
  // ...
  chainWebpack: config => {
    // ...
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.exposeFilename = true
          return options
        })
  }
};
```

开发环境默认是开启 `exposeFilename` 的。

此时组件内应该直接取 `this.$options.__file`，内容大致为 `src/foo/bar.vue`。

### 缺点

- **为了安全**，`vue-loader` 在生产环境将 `__file` 赋值为文件名，非路径名，[详见文档](https://vue-loader.vuejs.org/options.html#exposefilename)

*后来得知这个方法，老李就第一时间改代码，删了方案 1 中的所有附加代码，结果发现生产环境结果不一致，翻车了orz*

## 方案 3 ：loader + Custom Block

既然方案 2 不让在生产环境用，那就自己写 loader 去加上这个源码路径，这里采用了 [Custom Block](https://vue-loader.vuejs.org/guide/custom-blocks.html)。

这个方法是慢慢调试自定义的 loader 摸索出来的，先在 vue-loader 之前加自定义的 loader A，
去注入 Custom Block 代码，再在全局加入一个针对该 Custom Block 的 loader B。

这里将方案封装，在 chainWebpack 中调用即可：

``` js
/* vue.config.js */
const VueFilenameInjector = require('./path/to/vue-filename-injector')

module.exports = {
  chainWebpack: config => {
    VueFilenameInjector(config, {
      propName: '__source' // default
    })
  }
}
```

源码参考：[@d2-projects/d2-advance/tools/vue-filename-injector](https://github.com/d2-projects/d2-advance/tree/master/tools/vue-filename-injector)

```
.
└── vue-filename-injector
    ├── README.md
    ├── index.js
    └── src
        ├── index.js
        └── lib
            ├── config.js
            ├── injector.js
            └── loader.js
```

`vue-filename-injector/index.js`：
``` js
const { blockName } = require('./lib/config.js')

// for chainWebpack
module.exports = function(config, options) {
  // 注入
  config.module
    .rule('vue')
    .use('vue-filename-injector')
    .loader(require.resolve('./lib/injector.js'))
    .options(options)
    .after('vue-loader') // 不知为何 .before() 不是预期的结果，这里就绕了一下
    .end()
  // 解析
  config.module
    .rule('')
    .resourceQuery(new RegExp(`blockType=${blockName}`))
    .use('vue-filename-injector-loader')
    .loader(require.resolve('./lib/loader.js'))
    .end()
}
```

`vue-filename-injector/lib/config.js`：
``` js
const defaultPropName = '__source'
const blockName = 'vue-filename-injector'

module.exports = {
  defaultPropName,
  blockName
}
```

`vue-filename-injector/lib/injector.js`，源码部分来自 `vue-loader`：
``` js
const path = require('path')
const loaderUtils = require('loader-utils')

const { blockName, defaultPropName } = require('./config.js')

module.exports = function (content /*, map, meta */) {
  const loaderContext = this

  const {
    rootContext,
    resourcePath
  } = loaderContext

  const context = rootContext || process.cwd()
  const options = loaderUtils.getOptions(loaderContext) || {}
  const rawShortFilePath = path
    .relative(context, resourcePath)
    .replace(/^(\.\.[\/\\])+/, '')

  const propName = options.propName || defaultPropName

  content += `
<${blockName}>
export default function (Component) {
  Component.options.${propName} = ${JSON.stringify(rawShortFilePath.replace(/\\/g, '/'))}
}
</${blockName}>
`
  return content
}
```

`vue-filename-injector/lib/loader.js`：
``` js
module.exports = function(source, map) {
  this.callback(null, source, map)
}
```

## 相关仓库

可进入预览页面查看效果，在右下角有 Toggle

https://github.com/d2-projects/d2-admin （可能还在翻车中）

https://github.com/d2-projects/d2-advance

## 总结

目前看来，用自定义 loader 去注入代码是最便捷的方案，不用在每个组件中手写重复的代码。
由于 vue-cli3 采用 chainWebpack，加上个人对 webpack 的理解更是不深，暂时采用方案 3。

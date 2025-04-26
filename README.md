# hello_world

### 本地预览 [#](https://cli.vuejs.org/zh/guide/deployment.html#%E6%9C%AC%E5%9C%B0%E9%A2%84%E8%A7%88#本地预览)

`dist` 目录需要启动一个 HTTP 服务器来访问 (除非你已经将 `publicPath` 配置为了一个相对的值)，所以以 `file://` 协议直接打开
`dist/index.html` 是不会工作的。

在本地预览生产环境构建最简单的方式就是使用一个 Node.js 静态文件服务器，例如 [serve](https://github.com/zeit/serve)：

```text
npm install -g serve
# -s 参数的意思是将其架设在 Single-Page Application 模式下
# 这个模式会处理即将提到的路由问题
serve -s dist
```

## 去除console.log测试

### vue-cli 5.x测试成功

#### 方案1
```ts
const {defineConfig} = require("@vue/cli-service");
module.exports = defineConfig({
    chainWebpack(config) {
        config.optimization.minimizer("terser").tap((args) => {
            args[0].parallel = 4;
            args[0].terserOptions.compress.warnings = true;
            args[0].terserOptions.compress.drop_debugger = true;
            args[0].terserOptions.compress.drop_console = true;
            return args;
        });
    },
})
```

或者
```text
  configureWebpack: (config) => {
   if(process.env.NODE_ENV === 'production'){
        config.optimization.minimizer[0].options.minimizer.options.compress.drop_console = true;
        config.optimization.minimizer[0].options.minimizer.options.compress.drop_debugger = true;
    }
  },
```

> 注意：若同一个vue.config.js中有多个 configureWebpack，后边的会覆盖之前的配置
```text
  configureWebpack: {
    plugins: [
      require("unplugin-turbo-console/webpack").default({
        /* options here */
        extendedPathFileNames: ["index"],
      }),
    ],
  },
  // 会生效
  configureWebpack: (config) => {
    config.optimization.minimizer[0].options.minimizer.options.compress.drop_console = true;
    config.optimization.minimizer[0].options.minimizer.options.compress.drop_debugger = true;
  },
```

而
```text
  // 不会生效
  configureWebpack: (config) => {
    config.optimization.minimizer[0].options.minimizer.options.compress.drop_console = true;
    config.optimization.minimizer[0].options.minimizer.options.compress.drop_debugger = true;
  },
  configureWebpack: {
    plugins: [
      require("unplugin-turbo-console/webpack").default({
        /* options here */
        extendedPathFileNames: ["index"],
      }),
    ],
  },
```

不可写做为 chainWebpack,否则开发环境启动报错 TypeError: Cannot read properties of undefined (reading 'options')
```text
  chainWebpack: (config) => {
    config.optimization.minimizer[0].options.minimizer.options.compress.drop_console = true;
    config.optimization.minimizer[0].options.minimizer.options.compress.drop_debugger = true;
  },
```
#### 方案2

```text
const plugins = [];
const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
  plugins.push(["transform-remove-console", { exclude: ["error", "warn"] }]);
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins,
};
```

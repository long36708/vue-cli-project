const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// const isProduction = process.env.NODE_ENV === "production";
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  parallel: false, // important
  productionSourceMap: false,
  // !
  // chainWebpack(config) {
  //   config.optimization.minimizer("terser").tap((args) => {
  //     args[0].parallel = 4;
  //     args[0].terserOptions.compress.warnings = true;
  //     args[0].terserOptions.compress.drop_debugger = true;
  //     args[0].terserOptions.compress.drop_console = true;
  //     return args;
  //   });
  // },
  // 错误写法，开发报错
  // chainWebpack: (config) => {
  //   config.optimization.minimizer[0].options.minimizer.options.compress.drop_console = true;
  //   config.optimization.minimizer[0].options.minimizer.options.compress.drop_debugger = true;
  // },
  // configureWebpack: (config) => {
  //   config.optimization.minimizer[0].options.minimizer.options.compress.drop_console = true;
  //   config.optimization.minimizer[0].options.minimizer.options.compress.drop_debugger = true;
  // },
  configureWebpack: {
    plugins: [
      require("unplugin-turbo-console/webpack").default({
        /* options here */
        extendedPathFileNames: ["index"],
      }),
      new NodePolyfillPlugin(),
    ],
  },
});

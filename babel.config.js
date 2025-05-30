const plugins = [];
const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
  plugins.push(["transform-remove-console", { exclude: ["error", "warn"] }]);
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins,
};

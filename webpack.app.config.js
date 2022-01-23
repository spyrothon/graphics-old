const { getBaseWebpackConfig } = require("./tools/webpack");

module.exports = (_env, options) => {
  const baseConfig = getBaseWebpackConfig(options, { app: "app", index: "./app/index.html" });

  return {
    ...baseConfig,
    entry: "./app/index.tsx",
  };
};

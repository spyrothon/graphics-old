const { getBaseWebpackConfig } = require("./tools/webpack");

module.exports = (_env, options) => {
  const baseConfig = getBaseWebpackConfig(options, "app");

  return {
    ...baseConfig,
    entry: "./app/index.tsx",
  };
};

const { getBaseWebpackConfig } = require("./tools/webpack");

module.exports = (_env, options) => {
  const baseConfig = getBaseWebpackConfig(options, { app: "graphics" });

  return {
    ...baseConfig,
    entry: "./graphics/index.tsx",
  };
};

const { getBaseWebpackConfig } = require("./tools/webpack");

module.exports = (_env, options) => {
  const baseConfig = getBaseWebpackConfig(options, { app: "admin" });

  return {
    ...baseConfig,
    entry: "./admin/index.tsx",
  };
};

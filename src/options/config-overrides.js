const path = require('path');
const {
  removeModuleScopePlugin, 
  babelInclude,
} = require('customize-cra');

module.exports = {
  webpack: (config, env) => {
    config.output = {
      ...config.output,
      publicPath: './',
    };
    config = removeModuleScopePlugin()(config);
    config = babelInclude([
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, '../base'),
    ])(config);
    return config;
  },
  devServer: configFunction => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      config.devMiddleware = {
        ...config.devMiddleware,
        writeToDisk: true,
      };
      return config;
    };
  },
};

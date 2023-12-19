const path = require('path');

module.exports = function override(config, env) {
  // Add resolve.fallback for the url module
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "url": require.resolve("http://localhost:3000/"),
  };

  return config;
};

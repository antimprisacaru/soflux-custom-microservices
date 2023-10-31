const target = 'http://0.0.0.0:3000';
const logLevel = 'debug';
const logProvider = () => console;

const PROXY_CONFIG = {
  '/graphql': {
    target,
    secure: false,
    changeOrigin: true,
    logLevel,
    logProvider,
  },
};

module.exports = PROXY_CONFIG;

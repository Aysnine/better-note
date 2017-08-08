module.exports = {
  apps : [
    {
      name      : 'bnote',
      script    : './bin/pm2',
      env: {
        PORT: 7223
      }
    }
  ]
};

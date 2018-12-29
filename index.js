const signale = require('signale');

module.exports = (mongoose, url) => new Promise((resolve, reject) => {
  mongoose.connection.on('connected', () => {
    signale.info('Connection Established');
    resolve();
  });

  mongoose.connection.on('reconnected', () => {
    signale.info('Connection Reestablished');
  });

  mongoose.connection.on('disconnected', () => {
    signale.info('Connection Disconnected');
  });

  mongoose.connection.on('close', () => {
    signale.info('Connection Closed');
  });

  mongoose.connection.on('error', error => {
    signale.info(`ERROR: ${error}`);
    reject();
  });

  const dbName = url.substr(url.lastIndexOf('/') + 1, url.length);

  signale.info(`Connecting to database: ${dbName}`);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  return mongoose.connect(url, {
    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000
  });
});

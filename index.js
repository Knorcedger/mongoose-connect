const signale = require("signale");

module.exports = (mongoose, url) =>
  new Promise((resolve, reject) => {
    mongoose.connection.on("connected", () => {
      signale.info("Connection Established");
      resolve("Connected");
    });

    mongoose.connection.on("reconnected", () => {
      signale.info("Connection Reestablished");
    });

    mongoose.connection.on("disconnected", () => {
      signale.info("Connection Disconnected");
    });

    mongoose.connection.on("close", () => {
      signale.info("Connection Closed");
    });

    mongoose.connection.on("error", (error) => {
      signale.info(`ERROR: ${error}`);
      reject(error);
    });

    if (!mongoose) {
      throw new Error("Please provide a valid mongoose instance");
    }

    if (!url) {
      throw new Error("Please provide a valid database url");
    }

    const dbName = url.substring(
      url.lastIndexOf("/") + 1,
      url.indexOf("?") !== -1 ? url.indexOf("?") : url.length
    );

    signale.info(`Connecting to database: ${dbName}`);

    return mongoose.connect(url, {
      useNewUrlParser: true,
    });
  });

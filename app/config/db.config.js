module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "",
    dialect: "mysql",
    port:33060,
    pool: {
      max: 5, //maximum number of connection in pool
      min: 0,
      acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000
    }
  };
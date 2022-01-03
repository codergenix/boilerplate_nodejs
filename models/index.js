
  const dbConfig = require("../config/db.config");
  //=======================================
  const Sequelize = require("sequelize");
  //========================================
  const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      operatorsAliases: false,
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
      }
  });
  //===================================
  const model = {};
  model.Sequelize = Sequelize;
  model.sequelize = sequelize;
  //=========================
  model.Users = require("./user")(sequelize, Sequelize);
  
  //========== temp query run check=================
  // model.Users.create({
  //   FirstName: "parbat",
  //   LastName: "solanki",
  //   Email: 'parbat.codergenix@gmail.com',
  //   Password: '123456',
  // })
  //model.Users.restore()
  
  //=========================
  module.exports = model;


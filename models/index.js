
  const fs = require('fs');
  const path = require('path');
  const dbConfig = require("../config/db.config");
  const basename = path.basename(__filename);
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
  //model.Users = require("./user")(sequelize, Sequelize); // -- single module import ;
  //--- dynamic model import ---
  fs.readdirSync(__dirname).filter((file) => {
    return ( file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' );
  }).forEach((file) => {
        // const model = sequelize['import'](path.join(__dirname, file));
        const modelfile = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        model[modelfile.name] = modelfile;
    });
    Object.keys(model).forEach(function(modelName) {
      if (model[modelName].associate) {
        model[modelName].associate(model);
      }
    });
 //================
  model.Sequelize = Sequelize;
  model.sequelize = sequelize;
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


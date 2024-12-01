const { Sequelize } = require('sequelize');const path = require('path');const sequelize = new Sequelize({dialect: 'sqlite',storage: process.env.DB_PATH});const db = {};db.sequelize = sequelize;db.User = require('./user')(sequelize);db.PizzaPlace = require('./pizzaPlace')(sequelize);db.Review = require('./review')(sequelize);db.Consumption = require('./consumption')(sequelize);db.User.hasMany(db.Review);db.Review.belongsTo(db.User);db.User.hasMany(db.Consumption);db.Consumption.belongsTo(db.User);db.PizzaPlace.hasMany(db.Review);db.Review.belongsTo(db.PizzaPlace);db.PizzaPlace.hasMany(db.Consumption);db.Consumption.belongsTo(db.PizzaPlace);module.exports = db;
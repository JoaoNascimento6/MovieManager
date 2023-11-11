var Sequelize = require('sequelize');
var sequelize = require('./database');


var genero = sequelize.define('generos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  genero: Sequelize.STRING
}, { timestamps: false, });

module.exports = genero;
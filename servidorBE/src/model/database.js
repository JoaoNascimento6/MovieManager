var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    'AI',//base de dados
    'postgres',//utilizador
    '12345', //pass
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);
module.exports = sequelize;
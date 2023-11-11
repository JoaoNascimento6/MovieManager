var Sequelize = require('sequelize');
var sequelize = require('./database');
var Genero = require('./Genero');

var Filmes = sequelize.define('filmes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: Sequelize.STRING,
    ano: Sequelize.DATEONLY,
    descricao: Sequelize.STRING,
    foto: Sequelize.STRING,
    generoId: {
        type: Sequelize.INTEGER,
        // reference another model
        references: {
            model: Genero,
            key: 'id'
        }
    }
}, {
    timestamps: false,
});

Genero.hasMany(Filmes);
Filmes.belongsTo(Genero);

module.exports = Filmes;

var Filmes = require('../model/Filme');
var Generos = require('../model/Genero');
var sequelize = require('../model/database');
const controllers = {}
sequelize.sync()

//________________________________retorna os dados de todos os filmes existentes na BD_____________________________

controllers.filme_list = async (req, res) => {
    const data = await Filmes.findAll({
        include: [Generos]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

//_____________________________Retorna os dados do Filme de acordocom o seu ID._____________________________

controllers.filme_detail = async (req, res) => {
    const { id } = req.params;
    const data = await Filmes.findAll({
        where: { id: id },
        include: [Generos]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}

//_________________________________________Criar novo Filme__________________________________

controllers.filme_create = async (req, res) => {
    // data
    const { id, descricao, titulo, ano, foto, generoId: generoId } = req.body;
    // create
    console.log('Dados recebidos:', req.body);
    const data = await Filmes.create({
        id: id,
        descricao: descricao,
        ano: ano,
        titulo: titulo,
        foto: foto,
        generoId: generoId
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            console.log("Erro: " + error)
            return error;
        })
    // return res
    res.status(200).json({
        success: true,
        message: "Registado",
        data: data
    });
    console.log('Dados salvos:', data);
}

//_________________________________________Atualizar Filme__________________________________

controllers.filme_update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { descricao, titulo, ano, foto, generoId: generoid } = req.body;
    // Update data
    const data = await Filmes.update({
        ano: ano,
        descricao: descricao,
        titulo: titulo,
        foto: foto,
        generoId: generoid
    },
        {
            where: { id: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Updated successful" });
}
//__________________________DELETE_________________________________________________
controllers.filme_delete = async (req, res) => {
    // parâmetros por post
    const { id } = req.body;
    // delete por sequelize
    const del = await Filmes.destroy({
        where: { id: id }
    })
    res.json({ success: true, deleted: del, message: "Deleted successful" });
}

module.exports = controllers;
var Generos = require('../model/Genero');
var sequelize = require('../model/database');


const controllers = {}


//________________________________retorna os dados de todos os generos existentes na BD_____________________________

controllers.generos_list = async (req, res) => {
    const data = await Generos.findAll({
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

//_____________________________Retorna os dados do Genero de acordocom o seu ID._____________________________

controllers.generos_detail = async (req, res) => {
    const { id } = req.params;
    const data = await Generos.findAll({
        where: { id: id }
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

controllers.generos_create = async (req, res) => {
    // data
    const { id } = req.params;
    const { genero } = req.body;
    // create
    console.log('Dados recebidos:', req.body);
    const data = await Generos.create({
        id: id,
        genero: genero,
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
//_________________________________________Atualizar Genero__________________________________

controllers.generos_update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { genero } = req.body;
    // Update data
    const data = await Generos.update({
        genero: genero,
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


//______________________DELETE_____________________________________________________

controllers.generos_delete = async (req, res) => {
    // parâmetros por post
    const { id } = req.body;
    // delete por sequelize
    const del = await Generos.destroy({
        where: { id: id }
    })
    res.json({ success: true, deleted: del, message: "Deleted successful" });
}

module.exports = controllers;
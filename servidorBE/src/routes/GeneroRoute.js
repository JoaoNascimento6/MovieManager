const express = require('express');
const router = express.Router();

const GeneroController = require('../controllers/GeneroController');

// Importar os controladores
router.get('/', GeneroController.generos_list);
router.get('/:id', GeneroController.generos_detail);
router.post('/create', GeneroController.generos_create);
router.put('/update/:id', GeneroController.generos_update);
router.post('/delete', GeneroController.generos_delete);

module.exports = router;

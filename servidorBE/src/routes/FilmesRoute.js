const express = require('express');
const router = express.Router();
const FilmesController = require('../controllers/FilmesController')

//____________________________________importar os controladores ____________________________________

router.get('/', FilmesController.filme_list);
router.get('/:id', FilmesController.filme_detail);
router.post('/create', FilmesController.filme_create);
router.put('/update/:id', FilmesController.filme_update);
router.post('/delete', FilmesController.filme_delete);


module.exports = router;
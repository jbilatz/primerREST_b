const express = require('express');
const router = express.Router();

const usuarioCtrl = require('../controladores/usuario');

const Usuario = require('../models/usuario');

router.post('/signup', usuarioCtrl.signup);
router.post('/login', usuarioCtrl.login);
router.get('/', usuarioCtrl.listadoUsuarios);

/*
Asístá claro qué rutas están disponibles en qué puntos finales / endPoints y los nombres descriptivos
dados a las funciones de nuestro controlador facilitan la comprensión de lo que hace cada ruta.
Si bien no es absolutamente necesario para todos los proyectos, estructurar el código
de una manera modular como ésta es un buen hábito, ya que realmente hace que el mantenimiento sea mucho más fácil.
*/

module.exports = router;

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const reunionCtrl = require('../controladores/reunion')

const Meeting = require('../models/meeting'); // carga el esquema de Mongoose que generamos en la carpeta "models"


/* aplicar el middleware "auth" a las rutas de las reuniones, que son las que queremos proteger.
intercalando nuestro middleware como parámetro, 
ENTRE el String de la ruta propiamente dicha, y la función de nuestro controladores
*/ 

router.post('/', auth, reunionCtrl.crearReunion );

/*
middleware para pedir los datos de una determinada reunión
*/
router.get('/:id', reunionCtrl.datosUnaReunion );

/*
middleware para pedir el listado de todas las reuniones
*/
router.get('/', reunionCtrl.listadoDeReuniones);

/*
middleware para modificar los datos de una determinada reunión
*/
router.patch('/:id', auth, reunionCtrl.modificarReunion );

/*
middleware para borrar los datos de una determinada reunión
*/
router.delete('/:id', auth, reunionCtrl.borrarReunion );



module.exports = router;
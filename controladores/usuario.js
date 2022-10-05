const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
Acá vamos a plantear la lógica del usuario, o sea las funciones que necesitamos,
qué necesitamos que haga:
- Registrarse: signup
- Validarse: login
- ya que estamos, pedir un listado de todos los suarios en la base de datos
*/

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new Usuario({
                email: req.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: "Usuario registrado con exito"
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );

}

exports.login = (req, res, next) => {
/*
usamos nuestro modelo Mongoose para verificar si el email ingresado por el usuario
correspondea un usuario existente en la base de datos
- si no es así, devolvemos un error 401 no autorizado
- si lo hace, seguimos adelante: return
*/
    Usuario.findOne( { email: req.body.email}).then(
        (usuario) => {
            if(!usuario) {
                return res.status(401).json({
                    error: new Error('Usuario no encontrado!')
                });
            }

/*
usamos la función de comparación de bcrypt para comparar la contraseña ingresada por el usuario con el hash guardado en la base de datos
- si no coinciden, devolvemos un error 401 no autorizado
- si coinciden, es que nuestro usuario tiene credenciales válidas
*/
            bcrypt.compare(req.body.password, usuario.password).then(
                (valid) => {
                    if(!valid){
                        return res.status(401).json({
                            error: new Error('Password Incorrecto!')
                        });
                    }
                    
/*
Acá: usamos la función sign() de jsonwebtoken para codificar un nuevo token,
que usamos en nuestra response, en vez del String ‘token’

sign() toma como parámetros:
- el ID del usuario 
- una cadena secreta para codificar nuestro token (en desarrollo, temporaria, para ser reemplazada
    por una cadena aleatoria mucho más larga para producción)
- el tiempo de validez del token , q establecemos de 24 horas
- enviamos el token de vuelta al front-end con nuestra respuesta
*/

                    const token = jwt.sign(
                        {tknUserId: usuario._id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h'} );

                    res.status(200).json({
                        tknUserId: usuario._id,
                        token: token
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    })
                }
            )
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            })
        }
    )

}

exports.listadoUsuarios = (req, res, next) => {
    Usuario.find().then(
        (usuarios) => {
            res.status(200).json(usuarios)
        }

    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );

}


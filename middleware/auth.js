const jwt = require('jsonwebtoken');

/*
En este middleware:
- como muchas cosas pueden salir mal, estamos poniendo todo dentro de un bloque try ... catch
- extraemos el token del encabezado Authorization de la request/solicitud entrante
    (hay que recordar que también contendrá la palabra clave Bearer, por lo que usamos la función split()
    para obtener todo después del espacio en el encabezado, y cualquier error arrojado aquí va a terminar en el bloque de catch
- usamos la función verify para decodificar nuestro token si el token no es válido, esto dará error
- extraemos el ID de usuario de nuestro token
- si la solicitud/request contiene un ID de usuario, lo comparamos con el extraído del token; si no son iguales, arrojamos un error
- de lo contrario, todo está bien y nuestro usuario está autenticado; pasamos la ejecución usando la función next()
*/

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const tknUserId = decodedToken.userId;
        if(req.body._id && req.body._id !== tknUserId) {
            throw 'Usuario Inválido!';
        } else {
            next();

        }

    } catch {
        res.status(401).json({
            error: new Error('Solicitud Invalida!')
        })
    }
}

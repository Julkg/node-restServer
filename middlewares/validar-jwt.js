const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

//Recuerda, cada middleware tiene 3 argumentos, el tercero es next, para indicar que pase con el siguiente middleware de pasar nuestras verificaciones
const validarJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: "Token no valido - usuario no existe en DB",
            });
        }

        //Verificar si el uid tiene estado en true

        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Token no valido - usuario con estado: false",
            });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido",
        });
    }
};

module.exports = { validarJWT };

const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    //Podemos hacer una validacion extra, antes, para saber si es un numero antes de pasarlo como argumento
    // const usuarios = await Usuario.find(query); //busca los que tengan el estado en true
    // const total = await Usuario.countDocuments(query);

    //NO ES CONVENIENTE PONER 2 AWAITS EN ESTE CASO, PORQUE UNO NO ES DEPENDIENTE DEL OTRO

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);
    res.json({
        total,
        usuarios,
    });
};

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
};
const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //TODO ESTE CODIGO LO PASAMOS A HELPER Y LO LLAMAMOS EN LA RUTA COMO UN MIDDLEWARE

    // Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({ correo });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: "El correo ya esta registrado",
    //     });
    // }

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    //Aquí guardamos el nuevo usuario en la base como tal
    await usuario.save();

    res.json(usuario);
};
const usuariosPatch = (req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: "patch API",
    });
};
const usuariosDelete = async (req, res) => {
    const { id } = req.params;

    //Para borrarlo físicamente (NO RECOMENDADO)
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario,
    });
};
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosPost,
    usuariosDelete,
};

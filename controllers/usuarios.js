const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
    const { q, nombre = "no name", apikey, page = 1, limit } = req.query;

    res.json({
        ok: true,
        msg: "get API",
        q,
        nombre,
        apikey,
        page,
        limit,
    });
};

const usuariosPut = (req, res = response) => {
    const { id } = req.params;

    res.status(400).json({
        ok: true,
        msg: "put API",
        id,
    });
};
const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.status(201).json({
        ok: true,
        msg: "post API",
        nombre,
        edad,
    });
};
const usuariosPatch = (req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: "patch API",
    });
};
const usuariosDelete = (req, res) => {
    res.json({
        ok: true,
        msg: "delete API",
    });
};
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosPost,
    usuariosDelete,
};

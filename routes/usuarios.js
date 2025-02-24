const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        check("rol").custom(esRoleValido),
        validarCampos,
    ],
    usuariosPut
);

//Para ponder un middleware que actue antes de llamar nuestra ruta, se usa como segundo argumento en router.ROUTE(1er,2do,3er), si hay solo 2 argumentos como los demas ejemplos llama esa ruta normal, esto es Express

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check(
            "password",
            "El password debe de ser de mas de 6 letras"
        ).isLength({ min: 6 }),
        check("correo", "El correo no es valido").isEmail(),
        check("correo").custom(emailExiste),
        // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        check("rol").custom(esRoleValido),
        validarCampos,
    ],
    usuariosPost

    // El check lo que hace es almacenar los errores en la req para que podamos usarlos a nuestra conveniencia, no tira el error de una vez
);

router.patch("/", usuariosPatch);

router.delete(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        validarCampos,
    ],
    usuariosDelete
);

module.exports = router;

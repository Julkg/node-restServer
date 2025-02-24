const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../DB/config");
const app = express();

class Server {
    constructor() {
        this.app = app;
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacions
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y Parseo del body

        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}

module.exports = Server;

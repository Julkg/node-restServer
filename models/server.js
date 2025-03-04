const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { dbConnection } = require("../DB/config");
const app = express();

class Server {
    constructor() {
        this.app = app;
        this.port = process.env.PORT;

        this.usuariosPath = "/api/usuarios";
        this.authPath = "/api/auth";

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

        // Helmet para añadir cabeceras de seguridad (como XSS Protection, etc.)
        this.app.use(helmet());

        // Añadir cabeceras COOP y COEP manualmente
        this.app.use((req, res, next) => {
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
            next();
        });
    }

    routes() {
        this.app.use(this.authPath, require("../routes/auth"));

        this.app.use(this.usuariosPath, require("../routes/usuarios"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}

module.exports = Server;

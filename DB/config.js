const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        const MONGODB_CNN = process.env.MONGODB_CNN;
        await mongoose.connect(MONGODB_CNN);

        console.log("Base de datos online");
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializar la base de datos");
    }
};

module.exports = {
    dbConnection,
};

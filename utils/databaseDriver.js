const mongoose = require('mongoose').default;

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('[LOG] Conexión exitosa a la base de datos...');
    } catch (error) {
        console.error(error);
        console.log('[ERROR] Error al conectar con la base de datos...');
    }
};
// Aquí se realiza la conexión a la base de datos

// Librería
import mysql from "mysql2/promise";

async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root1",
            password: "1234",
            database: "inventario_papeleria", // nombre de la base de datos
            charset: "utf8mb4"
        });

        return connection;

    } catch (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        throw error;
    }
}

export default connect;
// archivo de configuración de la base de datos
import connect from "../middlewares/db.mjs";

async function obtenerRegistros() {
    // Establecemos la conexión a la base de datos
    const db = await connect();

    try {
        // Consulta para obtener todos los registros
        const [rows] = await db.execute("SELECT * FROM productos");

        // Se retornan los registros
        return Promise.resolve(rows);
    } catch (error) {
        // Se muestra el error y se retorna un mensaje de error
        console.log("Error:", error);
        return Promise.reject("Ocurrio un error al intentar obtener los datos");
    } finally {
        // Cerramos la conexión a la base de datos
        db.end();
    }
}

async function crearRegistro(nombre) {
    const db = await connect();

    try {
        const [result] = await db.execute(
            "INSERT INTO productos (nombre) VALUES (?)",
            [nombre]
        );

        console.log("Insertado:", result);
        return Promise.resolve("OK");
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject("Ocurrio un error al intentar agregar registros");
    } finally {
        db.end();
    }
}

async function editarRegistro(id, nombre) {
    const db = await connect();

    try {
        const [result] = await db.execute(
            "UPDATE productos SET nombre = ? WHERE id = ?",
            [nombre, id]
        );

        console.log("Editado:", result);
        return Promise.resolve("OK");
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject("Ocurrio un error al intentar editar registros");
    } finally {
        db.end();
    }
}

async function eliminarRegistro(id) {
    const db = await connect();

    try {
        const [result] = await db.execute(
            "DELETE FROM productos WHERE id = ?",
            [id]
        );

        console.log("Eliminado:", result);
        return Promise.resolve("OK");
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject("Ocurrio un error al intentar eliminar registros");
    } finally {
        db.end();
    }
}

export default {
    obtenerRegistros,
    crearRegistro,
    editarRegistro,
    eliminarRegistro
};
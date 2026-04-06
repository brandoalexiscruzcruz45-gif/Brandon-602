// este controlador obtiene los datos que te envia el cliente
// asi como los datos o las funciones para regresarle informacion

// librerias
import express from "express";

// servicio que se comunica con la base de datos
import ProductoService from "../services/producto.service.mjs";

const router = express.Router();

// req - parametros que envia el usuario
// res - metodos para regresar informacion
// next - pasa errores al error handler

function obtenerRegistros(req, res, next) {
    ProductoService.obtenerRegistros()
        .then((registros) => res.json(registros))
        .catch((err) => next(err));
}

function crearRegistros(req, res, next) {
    const { nombre } = req.body;

    ProductoService.crearRegistro(nombre)
        .then(() => {
            res.status(201).json({ mensaje: "Producto registrado correctamente." });
        })
        .catch((err) => next(err));
}

function editarRegistros(req, res, next) {
    const { id, nombre } = req.body;

    ProductoService.editarRegistro(id, nombre)
        .then(() => {
            res.status(200).json({ mensaje: "Producto editado correctamente." });
        })
        .catch((err) => next(err));
}

function eliminarRegistros(req, res, next) {
    const { id } = req.params;

    ProductoService.eliminarRegistro(id)
        .then(() => {
            res.status(200).json({ mensaje: "Producto eliminado correctamente." });
        })
        .catch((err) => next(err));
}

// rutas
router.get("/", obtenerRegistros);
router.post("/", crearRegistros);
router.put("/", editarRegistros);
router.delete("/:id", eliminarRegistros);

export default router;
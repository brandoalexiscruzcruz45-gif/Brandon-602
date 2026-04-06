// Configuración general de errores

// Este archivo se encarga de procesar los errores según su tipo

import {
  NotFoundException,
  ForbiddenException,
  TokenException,
  FileException,
  ConflictException,
  BadRequestException,
  UnprocessableEntityException,
  PartialException
} from "./exceptions.mjs";

function errorHandler(err, req, res, next) {

  // Error como string
  if (typeof err === "string") {
    return res.status(400).json({ mensaje: err });
  }

  // Error de validación
  if (err.name === "ValidationError" || err instanceof BadRequestException) {
    return res.status(400).json({ mensaje: err.message });
  }

  // Error de autenticación
  if (err.name === "UnauthorizedError" || err instanceof TokenException) {
    return res.status(401).json({ mensaje: "BAD_TOKEN" });
  }

  // Error de permisos
  if (err instanceof ForbiddenException) {
    return res.status(403).json({ mensaje: "Permisos insuficientes." });
  }

  // No encontrado
  if (err instanceof NotFoundException) {
    return res.status(404).json({ mensaje: err.message });
  }

  // Conflictos o archivos
  if (err instanceof FileException || err instanceof ConflictException) {
    return res.status(409).json({ mensaje: err.message });
  }

  // Entidad no procesable
  if (err instanceof UnprocessableEntityException) {
    return res.status(422).json({ mensaje: err.message });
  }

  // Respuesta parcial
  if (err instanceof PartialException) {
    return res.status(200).json({
      mensaje: err.message,
      esParcial: true
    });
  }

  // Archivo demasiado grande
  if (err.message && err.message.includes("File too large")) {
    return res.status(409).json({
      mensaje: "Tamaño máximo de archivo excedido."
    });
  }

  // Error general
  return res.status(500).json({ mensaje: err.message });
}

export default errorHandler;
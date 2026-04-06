import "rootpath";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import config from "./middlewares/config.mjs";
import errorHandler from "./middlewares/error-handler.mjs";

import ProductoController from "./controllers/producto.controller.mjs";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/producto", ProductoController);

app.use(errorHandler);

app.listen(config.PORT, () => {
    console.log("Server listening on port", config.PORT);
});
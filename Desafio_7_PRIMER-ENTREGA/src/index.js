import express from "express";
import { ProductRouter, CartRouter } from "./routers/index.js";

//Libreria dotenv
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

//Los midlewares obligatorios para poder decodificar el JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// para servir archivos estaticos
app.use(express.static("public"));

//Ruta Base
app.use('/api/products', ProductRouter);
app.use('/api/carrito', CartRouter);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
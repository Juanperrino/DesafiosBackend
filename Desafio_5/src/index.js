// ACA ARMAMOS TODA LA LOGICA PARA EL SERVIDO
import express from "express";
import { productRouter } from "./routers/ProductRouter.js";
import { ViewsRouter } from "./routers/ViewsRouter.js";
import handlebars from "express-handlebars";

// const express = require('express') // esto viene por defecto en node, pero nosotros tenemos seteado en el package.json el type, que nos permite usar import que es mas actual(creo que corresponde a typeScript). Y al setear type desabilita require. 

const PORT = 8080;
const app = express();

//Son necesarios ambas lineas
app.use(express.json());
app.use(express.urlencoded({ extend: true }));


//Seteamos el engine 
app.engine('hbs', handlebars.engine({
    defaultLayout: "main.hbs"
}));

//Seteamos el view engine
app.set("view engine", "hbs");
// Seteamos nuestra ruta de vistas
app.set("views", './views');



app.use("/", ViewsRouter);
app.use("/api/productos", productRouter);



const server = app.listen(PORT, () =>
    console.log("Server running on port:" + server.address().port)
);
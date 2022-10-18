import { Router } from "express";
// import { ContainerMemory } from "../Containers/ContainerMemory.js" //Ojo con la extension y la ruta, agregar .js y ../ para iniciar
import { ProductApi } from '../Api/ProductApi.js';

const productRouter = Router();

// Creamos instancia de ContainerMemory
// const ProductMemory = new ContainerMemory();

// AHORA TENEMOS QUE CREAR TODAS NUESTRAS RUTAS.

// La primera es ir a buscar todos nuestros productos
productRouter.get("/", (req, res) => {
    const products = ProductApi.getAll();
    //res.send(products) es una forma de hacerlo

    //es la otra forma de hacerlo
    res.send({ success: true, data: products });
});

productRouter.get("/:id", (req, res) => {
    //Guardamos el id que recibimos por params
    const { id } = req.params;
    //Aplicamos el method getById y le pasamos el id params recibido
    const product = ProductApi.getById(Number(id));
    //Validamos si no existe el producto
    if (!product) {
        return res.send({ success: false, data: undefined, message: "Product not found" });
    }

    res.send({ success: true, data: product });
});


productRouter.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;

    const product = ProductApi.save({ title, price, thumbnail });

    res.send({ success: true, data: { id: product.id } });
});

productRouter.put("/:id", (req, res) => {

    const { id } = req.params
    const { title, price, thumbnail } = req.body;

    const updatedProduct = ProductApi.updateById(id, { title, price, thumbnail });

    res.send({ success: true, data: { updated: updatedProduct } });
});








export { productRouter };


// export default productRouter;
// export { productRouter };

// tambien lo podemos hacer en formato objeto que adentro tiene productRouter

// Luego para llamarlo podemos hacer un destructuring
// import {productRouter} from "./y la ruta"
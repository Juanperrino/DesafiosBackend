const Container = require('./Container');
const express = require('express');
const app = express();
const PORT = 8080;


const productos = new Container('./products.txt');

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenidos al server de Juan Perrino! 🐱‍🏍</h1>`)
});

app.get('/productos', (req, res) => {

    productos.getAll()
        .then(productos => res.json(productos))
        .catch(error => console.log(error))
});


app.get('/productos-random', async (req, res) => {
    const arrayProductos = [];
    let count = 0;
    await productos.getAll()
        .then((producto) => {
            arrayProductos.push(...producto)
        })
        .catch(error => console.log(error));
    count = Math.floor(Math.random() * arrayProductos.length) + 1
    res.json(await productos.getById(count))
});



app.listen(PORT, () => { console.log(`: ${PORT}`) });





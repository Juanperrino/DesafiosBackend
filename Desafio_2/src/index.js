import { Container } from "./containers/Container.js";
//const Container = require('./containers/Container.js)



const ProductContainer = new Container("productos");

// ProductContainer.getAll()
//     .then(data => console.log({ data }))
//     .catch(error => console.log({ error }))


ProductContainer.save({
    title: "Producto 1",
    price: 300,
    thumbnail: "httppasjdaskji"
})
    .then((data) => console.log({ data }))
    .catch((error) => console.log({ error }));


// ProductContainer.getById(5)
//     .then(data => console.log({ data }))
//     .catch(error => console.log({ error }))


// ProductContainer.deleteById(3).then((data) => console.log({ data }))

// ProductContainer.deleteAll();
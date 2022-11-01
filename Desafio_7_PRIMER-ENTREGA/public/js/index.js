// alert();
// Para comunicarnos con la API deberiamos hacer un GET, POST etc...
// Osea tenemos que consumir los JSON que nos mandan las rutas de express
// Lo que tiene JavaScript en el navegador es que puede utilizar una api llamada Fetch con el cual podemos consumir APIS.

// Creamos Funcion que nos devuelva todos los productos
const getProducts = async () => {
    try {
        const response = await fetch('/api/products')
        // Nos devuelve una promesa que no podemos leer entonces lo pasamos a JSON
        // El response.json() tambien es asincrono
        const products = await response.json()
        // console.log({ products });
        return products;
    } catch (error) {
        console.log({ error: "En getProducts Fetch" });
    }
};



// A este contenedor tenemos que agregarle los datos que queremos
const renderProducts = async () => {
    // Capturamos los elementos del DOM
    const productsContainer = document.getElementById('productsContainer');

    //Llamamos a la funcion de arriba para obtener y guardar en variable los productos
    const products = await getProducts()

    productsContainer.innerHTML = products.map((product) => `<table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.thumbnail}</td>
      </tr>
    </tbody>
  </table>`).join(" ");
}

const getProductsBtn = document.getElementById('getProductsBtn');

getProductsBtn.addEventListener('click', renderProducts);









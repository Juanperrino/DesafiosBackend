import { fetchApi } from './fetchApi.js';
const d = document,
    formIngreso = d.getElementById('formIngreso'),
    userId = d.getElementById('userId');

window.localStorage.setItem('userId', userId.value);
const admin = localStorage.getItem('admin');

let options = {
    body: {},
    headers: { 'content-type': 'application/json' },
};

const getProduct = async (cepa) => {
    let params = new URLSearchParams(location.search);
    var cepa = params.get('cepa');
    let url;
    !cepa
        ? (url = 'http://localhost:8099/api/productos')
        : (url = `http://localhost:8099/api/productos?cepa=${cepa}`);
    let response = await fetchApi().get(url);
    cardsProducts.innerHTML = '';
    response.forEach((product) => {
        let divProducts = d.createElement('div');
        divProducts.classList.add('col');
        divProducts.innerHTML = `
    <div class="card porduct" style="width: 18rem;">
    <div class="product__img">
  <img src="${product.imagen}" class="card-img-top " alt="${product.nombre}">
  </div>
  <div class="card-body">
    <h5 class="card-title">${product.nombre}</h5>
    <p class="card-text product__descript">${product.descripcion}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Precio $${product.precio}</li>
    <li class="list-group-item">Stock: ${product.stock}</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link btnAgregarProd btn btn-warning" id=${product._id} name="${product.nombre}">Agregar al Carrito</a>
    
  </div>
</div>      


`;
        {
        }
        cardsProducts.appendChild(divProducts);
    });
};

getProduct();
/* getCarritos(); */
const editPost = async () => {
    options.body = {
        title: title.value,
        description: description.value,
        stock: stock.value,
        price: price.value,
        thumbnail: thumbnail.value,
        codigo: codigo.value,
        _id: idInput.value,
    };

    await fetchApi().put(
        `http://localhost:8099/api/productos/${idInput.value}?admin=true`,
        options
    );
    getProduct();
};
const newProduct = async () => {
    options.body = {
        title: title.value,
        description: description.value,
        stock: stock.value,
        price: price.value,
        thumbnail: thumbnail.value,
        codigo: codigo.value,
    };
    await fetchApi().post(
        'http://localhost:8099/api/productos?admin=true',
        options
    );
};
const delet = async (id) => {
    await fetchApi().del(
        `http://localhost:8099/api/productos/${id}?admin=true`
    );
    location.reload();
};

const editForm = async (metodo, id) => {
    let response = await fetchApi().get(
        `http://localhost:8099/api/productos/${id}`
    );
    title.value = response.title;
    description.value = response.description;
    price.value = response.price;
    thumbnail.value = response.thumbnail;
    codigo.value = response.codigo;
    stock.value = response.stock;
    idInput.value = response._id;
    metodoInput.value = metodo;
};
const postInCart = async (id) => {
    options.body = { _id: id };
    await fetchApi().post(
        `http://localhost:8099/api/carrito/${carts.value}/productos`,
        options
    );
};
const newCart = async () => {
    await fetchApi().post('http://localhost:8099/api/carrito/');
    location.reload();
};
d.addEventListener('click', (e) => {
    if (e.target.matches('.editar')) {
        let metodo = e.target.getAttribute('value'),
            id = e.target.id;
        editForm(metodo, id);
        title.focus();
    }
});
d.addEventListener('click', (e) => {
    if (e.target.matches('.borrar')) {
        let isOk = confirm('Seguro que quieres elimar el producto');
        isOk && delet(e.target.id);
    }
});
d.addEventListener('click', (e) => {
    if (e.target.matches('.agregar')) {
        postInCart(e.target.id);
    }
});

const agregarCarrito = (user, product) => {
    options.body = { product, product };
    fetchApi().post(
        `http://localhost:8099/api/carrito/${user}/productos`,
        options
    );
};
d.addEventListener('click', (e) => {
    if (e.target.matches('.btnAgregarProd')) {
        agregarCarrito(userId.value, e.target.id);
        let productName = d.getElementById(e.target.id);
        Toastify({
            text: `Se agrego ${productName.name}`,
            position: 'center',
            offset: {
                x: 50,
                y: 10,
            },
            style: {
                background:
                    'linear-gradient(to right, #00b09b, #96c93d)',
            },
            duration: 3000,
        }).showToast();
    }
});

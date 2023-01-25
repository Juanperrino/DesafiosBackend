import { fetchApi } from './fetchApi.js';
const d = document,
    userId = window.localStorage.getItem('userId'),
    cardsProducts = d.getElementById('cardsProducts');

const getCart = async (user) => {
    let response = await fetchApi().get(
        `http://localhost:8099/api/carrito/?user=${user}`
    );
    let productos = response[0].productos;
    cardsProducts.innerHTML = '';
    productos.forEach((product) => {
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
    <li class="list-group-item">$${product.precio}</li>
    <li class="list-group-item">${product.stock}</li>
  </ul>
  <div class="card-body">
  <button type="button" class="btn btn-danger borrarr" id="${product._id}" name="${product.nombre}">Eliminar</button>   
  </div>
</div>      
  `;
        cardsProducts.appendChild(divProducts);
    });
};

getCart(userId);
const deleteProduct = async (idProduct, idCart) => {
    await fetchApi().del(
        `http://localhost:8099/api/carrito/${idCart}/productos/${idProduct}`
    );
    setTimeout(() => {
        location.reload();
    }, 2000);
};
const finalizarCompra = async (userId) => {
    await fetchApi().put(`http://localhost:8099/api/carrito/${userId}`);
    setTimeout(() => {
        location.reload();
    }, 2000);
};
d.addEventListener('click', (e) => {
    let productName = d.getElementById(e.target.id);
    if (e.target.matches('.borrarr')) {
        Swal.fire({
            title: 'Estas seguro de eliminar del carrito',
            text: `${productName.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si ,sacalo del carrito',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Se elimino!',
                    `1 botella de ${productName.name}`,
                    'success'
                );
                deleteProduct(e.target.id, userId);
            }
        });
    }
});
d.addEventListener('click', (e) => {
    if (e.target.matches('.btnFinalizar')) {
        Swal.fire({
            title: 'Seguro que desea finalizar la compra',
            text: ``,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Comprar!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Pedido finalizado!',
                    `Recibira un SMS de confimacion`,
                    'success'
                );
                finalizarCompra(userId);
            }
        });
    }
});

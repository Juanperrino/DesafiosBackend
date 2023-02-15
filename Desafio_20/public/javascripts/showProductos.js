const d = document,
      nameProduct = d.getElementById('nameProduct'),
      priceProduct = d.getElementById('priceProduct'),
      codProduct = d.getElementById('codProduct'),
      stockProduct = d.getElementById('stockProduct'),
      imgProduct = d.getElementById('imgProduct'),
      idProduct = d.getElementById('idProduct'),
      tableProducts = d.getElementById('tableProducts');

/*funcion para mostrar productos en el DOM */
const showProducts = (data) => {
      const tr = d.createElement('tr');
      tr.innerHTML = `<th>${data.nombre}</th>
  <td>$${data.precio}</td>
  <td><img src="${data.imagen}" alt="${data.nombre}"></td>
  <td>${data.codigo}</td>
  <td>${data.stock}</td>
  <td><img src="https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_09-512.png" alt="editar" class="editar" id="${data.id}"/> <img src="https://cdn4.iconfinder.com/data/icons/digital-marketing-7-2/35/303-512.png" alt="borrar" class="borrar" id="${data.id}"/></td>`;
      tableProducts.appendChild(tr);
};

const editProductForm = (data) => {
      nameProduct.value = data.nombre;
      priceProduct.value = data.precio;
      imgProduct.value = data.imagen;
      codProduct.value = data.codigo;
      stockProduct.value = data.stock;
      idProduct.value = data.id;
      nameProduct.focus();
};

const editProductData = () => {
      const data1 = {
            nombre: nameProduct.value,
            precio: priceProduct.value,
            imagen: imgProduct.value,
            codigo: codProduct.value,
            stock: stockProduct.value,
            id: idProduct.value,
      };
      return data1;
};
const newProductData = () => {
      const data1 = {
            nombre: nameProduct.value,
            precio: priceProduct.value,
            imagen: imgProduct.value,
            codigo: codProduct.value,
            stock: stockProduct.value,
      };
      return data1;
};
const resetProductData = () => {
      nameProduct.value = '';
      priceProduct.value = '';
      imgProduct.value = '';
      codProduct.value = '';
      stockProduct.value = '';
      idProduct.value = '';
      nameProduct.focus();
};

export {
      showProducts,
      editProductForm,
      editProductData,
      newProductData,
      resetProductData,
};

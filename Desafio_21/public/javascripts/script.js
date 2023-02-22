import { dataMensaje, showIsWriting, showMessage } from './showMenssage.js';
import {
      editProductData,
      editProductForm,
      newProductData,
      resetProductData,
      showProducts,
} from './showProductos.js';
import { validEmail } from './validation.js';

/*se definen todas la variables del  DOM */
const d = document,
      formProduct = d.getElementById('formProduct'),
      tableProducts = d.getElementById('tableProducts'),
      emailUser = d.getElementById('emailUser'),
      formMessage = d.getElementById('formMessage'),
      tituloMensajes = d.getElementById('tituloMensajes'),
      inputMessage = d.getElementById('inputMessage'),
      idProduct = d.getElementById('idProduct'),
      listMessage = d.getElementById('listMessage');
/*se definen las variables que van a almacenar los mensaje y productos */
let products = [],
      messages = [];

d.addEventListener('DOMContentLoaded', (e) => {
      obtener();
});

/*se conecta al socket.io */
const socket = io('/');

const obtener = async () => {
      await socket.on('history-products', (data) => {
            products = data;
            tableProducts.innerHTML = '';
            products.forEach((producto) => {
                  showProducts(producto);
            });
      });
};
function deleteProducts(id) {
      let isOk = confirm(`Esta seguro de borrar el producto con id ${id}`);
      isOk && socket.emit('delete-product', id);
}
async function editProducts(id) {
      await socket.emit('getId-product', id);
      await socket.on('one-product', (data) => {
            editProductForm(data);
      });
}
/*se definen los lissener */
d.addEventListener('click', (e) => {
      if (e.target.matches('.borrar')) {
            deleteProducts(e.target.id);
      }
});
d.addEventListener('click', (e) => {
      if (e.target.matches('.editar')) {
            editProducts(e.target.id);
      }
});

emailUser.addEventListener('keyup', () => {
      validEmail();
});
formProduct.addEventListener('submit', (event) => {
      event.preventDefault();
      if (idProduct.value.length != 0) {
            const data = editProductData();
            socket.emit('edit-product', data);
      } else {
            const data = newProductData();
            socket.emit('new-product', data);
      }

      resetProductData();
});
formMessage.addEventListener('submit', (event) => {
      event.preventDefault();
      let data = dataMensaje();
      if (validEmail()) {
            socket.emit('new-message', data);
            inputMessage.value = '';
            inputMessage.focus();
      }
});
socket.on('connect', () => {
      console.log('Conectados al servidor');
});

inputMessage.addEventListener('keyup', (e) => {
      socket.emit('new-isWriting', emailUser.value);
});

socket.on('history-message', (data) => {
      /* se desnormaliza la informacion */
      const autorScheme = new normalizr.schema.Entity(
            'author',
            {},
            { idAttribute: 'email' }
      );

      const mensajeScheme = new normalizr.schema.Entity('mensaje', {
            author: autorScheme,
      });
      const mensajeTotla = new normalizr.schema.Entity('mensaje', {
            mensaje: [mensajeScheme],
      });
      const dataReversed = normalizr.denormalize(
            data.result,
            mensajeTotla,
            data.entities
      );

      const originalSize = JSON.stringify(dataReversed).length;
      const normalizedSize = JSON.stringify(data).length;
      const resultSata = (normalizedSize * 100) / originalSize;
      let totalTotal = resultSata.toFixed(2);
      console.log(data, normalizedSize);

      console.log(
            '--------------------------------------------------------------------'
      );
      console.log(dataReversed, originalSize);
      tituloMensajes.innerText = '';
      console.log(`Porcentaje de compresion: ${totalTotal}%`);
      tituloMensajes.innerText = `Porcentaje de compresion: ${totalTotal}%`;
      const messages = dataReversed.mensaje;
      listMessage.innerHTML = '';
      messages.forEach((message) => {
            showMessage(message);
      });
});
socket.on('notification-product', (data) => {
      products.push(data);
      showProducts(data);
});
socket.on('notification-message', (data) => {
      messages.push(data);
      showMessage(data);
});
socket.on('IsWriting', (data) => {
      if (data !== emailUser.value) {
            showIsWriting(data);
      }
});

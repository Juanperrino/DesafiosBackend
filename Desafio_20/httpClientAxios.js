import axios from 'axios';

let id;
const responseGet = await axios.get('http://localhost:8080/api/productos');

console.log('respuesta GET:\n', responseGet.data);

const responPost = await axios.post('http://localhost:8080/api/productos', {
      nombre: 'Prueba',
      codigo: '2222',
      imagen: 'https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/input-mouse-512.png',
      precio: 2222,
      stock: 1122221,
});

id = await responPost.data.id;

const responseGetbyId = await axios.get(
      `http://localhost:8080/api/productos/${id}`
);
console.log('');
console.log('respuesta GetById:\n', responseGetbyId.data);

const responsePut = await axios.put(`http://localhost:8080/api/productos`, {
      id: id,
      nombre: 'Producto prueba',
      codigo: '11111',
      imagen: 'https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/input-mouse-512.png',
      precio: 1111,
      stock: 111,
});
console.log('responsePut', responsePut.data);

const responseDelete = await axios.delete(
      `http://localhost:8080/api/productos/${id}`
);
console.log('responseDelete:\n', responseDelete.data);

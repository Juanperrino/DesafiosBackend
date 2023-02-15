import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';
import winston, { format } from 'winston';
const logger = winston.createLogger({
      level: 'info',
      format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.json()
      ),
      transports: [
            new winston.transports.File({
                  filename: './test/testMochaChaiSupertest.log',
                  level: 'info',
            }),
      ],
});

describe('Productos', () => {
      afterEach(function () {
            let result = {
                  duration: this.currentTest.duration,
                  state: this.currentTest.state,
                  title: this.currentTest.title,
            };

            logger.info(result);
      });
      let id;
      it('Deberia obtener todos los productos', async () => {
            const response = await request(app).get('/api/productos');
            expect(response.statusCode).to.be.eq(200);
            expect(response.body).to.be.an('array');
      });
      it('Deberia Crear un producto', async () => {
            const response = await request(app).post('/api/productos').send({
                  nombre: 'Prueba',
                  codigo: '22222',
                  imagen: 'https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/input-mouse-512.png',
                  precio: 2222,
                  stock: 22222,
            });
            id = response.body.id;
            expect(response.statusCode).to.be.eq(201);
            expect(response.body).to.have.property('nombre');
            expect(response.body).to.have.property('codigo');
            expect(response.body).to.have.property('stock');
            expect(response.body).to.have.property('precio');
            expect(response.body).to.have.property('imagen');
            expect(response.body.id).to.be.eq(id);
      });

      it('Deberia obtener por id un  producto', async () => {
            await request(app).get(`/api/productos/${id}`);
      });
      it('Deberia Editar un producto', async () => {
            await request(app).put('/api/productos').send({
                  id: id,
                  nombre: 'Prueba Producto',
                  codigo: '11111',
                  imagen: 'https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/input-mouse-512.png',
                  precio: 1111,
                  stock: 111,
            });
      });
      it('Deberia Eliminar un producto', async () => {
            await request(app).delete(`/api/productos/${id}`);
      });
});

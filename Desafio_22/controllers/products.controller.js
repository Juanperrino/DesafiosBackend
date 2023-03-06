import productsService from '../services/products.service.js';

class ProductController {
      constructor() { }
      async getAllProducts(ctx) {
            const data = await productsService.getAllProducts();

            ctx.body = {
                  status: 'success',
                  message: data,
            };
      }

      async getProductosById(ctx) {
            const { id } = ctx.params;
            const data = await productsService.getProductosById(id);
            ctx.body = {
                  status: 'success',
                  message: data,
            };
      }
      async postProduct(ctx) {
            const { body } = ctx.request;
            if (
                  !body.nombre ||
                  !body.codigo ||
                  !body.imagen ||
                  !body.precio ||
                  !body.stock
            ) {
                  ctx.response.status = 400;
                  ctx.body = {
                        status: 'error',
                        message: 'Please enter the data',
                  };
            } else {
                  const data = await productsService.postProduct(body);
                  ctx.response.status = 201;
                  ctx.body = {
                        status: 'succes',
                        message: `Se agrego nuevo producto con la id:${data.id} con el nombre ${data.nombre} `,
                  };
            }
      }

      async putProduct(ctx) {
            const { body } = ctx.request;
            if (
                  !body.nombre ||
                  !body.codigo ||
                  !body.imagen ||
                  !body.precio ||
                  !body.stock
            ) {
                  ctx.response.status = 400;
                  ctx.body = {
                        status: 'error',
                        message: 'Please enter the data',
                  };
            } else {
                  const data = await productsService.upDate(body.id, body);
                  if (data !== false) {
                        ctx.response.status = 201;
                        ctx.body = {
                              status: 'succes',
                              message: `Se Modifico producto con la id:${body.id} con el nombre ${body.nombre} `,
                        };
                  } else {
                        ctx.body = {
                              status: 'error',
                              message: `No se encontro el producto con la id:${body.id} `,
                        };
                  }
            }
      }
      async deleteProduct(ctx) {
            const { id } = ctx.params;
            const data = await productsService.deleteProduct(id);
            if (data !== false) {
                  ctx.body = {
                        status: 'success',
                        message: `Se Elimino producto con la id:${id} `,
                  };
            } else {
                  ctx.body = {
                        status: 'error',
                        message: `No se encontro el producto con la id:${id} `,
                  };
            }
      }
}
export default new ProductController();

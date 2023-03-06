import Koa from 'Koa';
import { koaBody } from 'Koa-body';
import productos from './routers/api/productos.js';
const app = new Koa();
app.use(koaBody());
const PORT = process.env.PORT || 8080;

const ENV = process.env.ENV;

app.use(productos.routes());

app.use(async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.status || 500;
    if (ctx.status === 404) {
      ctx.response.status = 404;
      ctx.body = {
        status: 'error',
        message: 'No found',
      };
    }
  }
});

const server = app.listen(PORT, () => {
  console.log(`Servidor Http en el puerto ${server.address().port}`);
});
server.on('error', (err) => logger.error(`error en el servidor ${err}`));

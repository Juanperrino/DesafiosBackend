import { React, ReactDOMServer } from './deps.ts';
import { Application, Context, Router } from './deps.ts';

const app = new Application();
const router = new Router();

const colors: string[] = [];

const body = () => `<!DOCTYPE html>
      ${ReactDOMServer.renderToString(
    <html>
        <head>
            <meta charSet="utf-8" />
            <title>Colors</title>
        </head>
        <body style={{ background: '#000000', color: '#FFF' }}>
            <form method="POST">
                <label htmlFor="color">
                    Escribe un Color en Ingles
                </label>
                <br />
                <input type="text" id="color" name="color" />
                <br />
                <input type="submit" value="Send" />
            </form>
            {!!colors.length && (
                <ul>
                    {colors.map((color, i) => (
                        <li key={i} style={{ color }}>
                            {color}
                        </li>
                    ))}
                </ul>
            )}
        </body>
    </html>
)}
`;

router.get('/', (ctx: Context) => {
    ctx.response.status = 200;
    ctx.response.body = body();
});

router.post('/', async (ctx: Context) => {
    const cuerpo = ctx.request.body({ type: 'form' });
    const value = await cuerpo.value;
    const color = value.get('color');

    if (color) {
        colors.push(color);
    }
    ctx.response.status = 200;
    ctx.response.body = body();
});

app.use(router.routes())
    .use(router.allowedMethods())
    .use((ctx) => {
        ctx.response.status = 404;
        ctx.response.body = 'Not Found';
    });

console.log('Server runnig in http://localhost:8080');

await app.listen({ port: 8080 });

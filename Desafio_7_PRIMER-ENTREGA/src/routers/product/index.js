import { Router } from "express";
import { ProductDao } from '../../Dao/index.js';
import { verifyRole } from "../../middlewares/verifyRole.js";
import { DATE_UTILS } from "../../utils/date-utils.js";

const router = Router();


router.get("/", async (req, res) => {
    try {
        const product = await ProductDao.getAll();

        if (!product) {
            return res.send({ error: 'No se encontro el producto' })
        }

        res.send(product);
    } catch (error) {
        res.send({ error: "Internal server error" });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await ProductDao.getById(Number(id));

    res.send(product);
})


// id, timestamp, nombre, descripcion, codigo, foto (url), precio, stock.
router.post('/', verifyRole, async (req, res) => {
    try {
        const { title, description, code, thumbnail, price, stock } = req.body

        const product = { title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimestamp() }

        const createdProduct = await ProductDao.save(product);
        res.send(createdProduct);

    } catch (error) {
        res.send(error);
    }
});


router.delete('/:id', verifyRole, async (req, res) => {
    try {
        const { id } = req.params;

        await ProductDao.deleteById(Number(id));

        res.send({ success: true });

    } catch (error) {
        res.send({ error: 'Error inesperado' })
    }
})

router.put('/:id', verifyRole, async (req, res) => {
    try {

        const { id } = req.params
        const { title, description, code, thumbnail, price, stock } = req.body;

        const updatedProduct = ProductDao.updateById(id, { title, description, code, thumbnail, price, stock });

        res.send({ success: true, data: { updated: updatedProduct } });

    } catch (error) {
        res.send({ error: 'Error al actualizar producto' })
    }
})



export { router as ProductRouter };
import { ContainerFilesystem } from '../Containers/index.js';

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";

const ProductDao = new ContainerFilesystem(PRODUCTS_FILENAME);
const CartDao = new ContainerFilesystem(CARTS_FILENAME);


export { ProductDao, CartDao };
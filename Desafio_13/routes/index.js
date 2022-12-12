import {Router} from "express";
import routerLogin from "./login.js";
import routerProducts from "./products.js";

const router = Router();

router.use("/", routerLogin);
router.use("/api", routerProducts);

export default router;
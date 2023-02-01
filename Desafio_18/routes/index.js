import { Router } from "express";
import routerLogin from "./login.js";
import routerAPI from "./products.js";
import compression from "compression";
import { filterMiddleware, getServerInfo } from "../controller/index.js";

const router = Router();

router.use(compression());

router.use("/", routerLogin);
router.use("/api", routerAPI);
router.get("/info", getServerInfo)
router.get("*", filterMiddleware);

export default router;
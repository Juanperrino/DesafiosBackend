import { Router } from "express";
import routerLogin from "./login.js";
import routerProducts from "./products.js";

const router = Router();

router.use("/", routerLogin);
router.use("/api", routerProducts);

router.get("/info", (req, res) => {
    res.json({
        argv: process.argv.slice(2),
        platform: process.platform,
        version: process.version,
        rss: process.memoryUsage(),
        cwd: process.cwd(),
        pe: process.execPath,
        pid: process.pid,
    })
})

export default router;
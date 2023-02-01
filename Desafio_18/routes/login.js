import { Router } from "express";
import passport, { Passport } from "passport";
import { auth, getHome, getRegister, postRegister, getLogin, postLogin, getError, getLogout } from "../controller/login.js";

const router = Router();

router.get("/", auth, getHome);
router.get("/register", getRegister)
router.post("/register", passport.authenticate("register", { failureRedirect: "/error", failureMessage: true }), postRegister);
router.get("/login", getLogin)
router.post("/login", passport.authenticate("login", { failureRedirect: "/error", failureMessage: true }), postLogin);
router.get("/error", getError)
router.get("/logout", getLogout);

export default router;
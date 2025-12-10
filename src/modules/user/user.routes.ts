import { Router } from "express";
import registerHandler from "./registerHandler";
import { signupValidation } from "../../middleware/signupValidationis";
import { signInValidation } from "../../middleware/signInValidation";
import loginHandler from "./loginHandler";
import { logOutHandler } from "./logOutHandler";
import { authMiddleware } from "@/middleware/auth";
import { profileHandler } from "./profileHandler";

const router = Router();

router.post('/register', signupValidation, registerHandler);
router.post('/login', signInValidation,  loginHandler);
router.get('/profile', authMiddleware, profileHandler);
router.post('/logout', authMiddleware, logOutHandler);


export default router;
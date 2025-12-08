import { Router } from "express";
import registerHandler from "./registerHandler";
import { signupValidation } from "../../middleware/signupValidationis";
import { signInValidation } from "../../middleware/signInValidation";
import loginHandler from "./loginHandler";

const router = Router();

router.post('/register', signupValidation, registerHandler);
router.post('/login', signInValidation,  loginHandler);

export default router;
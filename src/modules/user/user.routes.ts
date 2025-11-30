import { Router } from "express";
import registerHandler from "./registerHandler";

const router = Router();

router.post('/register', registerHandler)

export default router;
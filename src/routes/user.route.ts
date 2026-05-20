import { Router } from "express";
import { loginUser, registerUser, transferMoney } from "../controllers/user.controller";
import { requireAuthentication } from "../middleware/auth";

const router = Router();
    
router.post('/register', registerUser);
router.post('/login', loginUser);

router.use(requireAuthentication)
router.put('/transfer/:targetUserId/:transfer',transferMoney)

export default router;

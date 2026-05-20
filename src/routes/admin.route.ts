import { Router } from "express";
import { requireAuthentication, requireAuthorization } from "../middleware/auth";
import { getAllSupportChats } from "../controllers/chat.controller";

const router = Router();
    
router.use(requireAuthentication)
router.use(requireAuthorization)
router.get('/chats', getAllSupportChats);


export default router;

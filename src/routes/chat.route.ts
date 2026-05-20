import { Router } from "express";
import { requireAuthentication, requireAuthorization } from "../middleware/auth";
import { createAdminMessage, createMessage, createSupportTicket, getAllSupportChats, getMySupportChatById, getMySupportChats } from "../controllers/chat.controller";

const router = Router();
    
router.use(requireAuthentication)
router.get('/',getMySupportChats)
router.get('/:supportChatId',getMySupportChatById)
router.post('/', createSupportTicket);
router.post('/:supportChatId', createMessage);
router.use(requireAuthorization)
router.get('/admin', getAllSupportChats);
router.post('/:supportChatId/admin', createAdminMessage);


export default router;

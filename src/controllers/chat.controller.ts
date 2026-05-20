import { Request, Response } from 'express';
import { createSupportChat, getAllMyChats } from '../service/chat.service';
import { findUserById } from '../service/user.service';

export const createSupportTicket = async(req:Request, res:Response) => {
    try{
        const userId = req.body.userID;
        const user = await findUserById(userId)
        if(!user){
            return res.status(404)
        }
        const supportChat = await createSupportChat(user,req.body.message);
        return res.status(201).json({message:"Successfully created support ticket", supportChat: supportChat.toJSON()})
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"Server error."})
    }
}
export const createMessage = async(req:Request, res:Response) => {
    try{

    }catch(error){
        return res.status(500).json({error:"Server error."})
    }
}
export const createAdminMessage = async(req:Request, res:Response) => {
    try{

    }catch(error){
        return res.status(500).json({error:"Server error."})
    }
}
export const getMySupportChatById = async(req:Request, res:Response) => {
    try{

    }catch(error){
        return res.status(500).json({error:"Server error."})
    }
}
export const getMySupportChats = async(req:Request, res:Response) => {
    try{
        const userId = req.body.userID;
        const supportChats = await getAllMyChats(userId);
        return res.status(200).json({message:"Successfully found chats.", supportChats: supportChats.map((chat) => chat.toJSON())})
    }catch(error){
        return res.status(500).json({error:"Server error."})
    }
}
export const getAllSupportChats = async(req:Request, res:Response) => {
    try {

    } catch (error) {
        return res.status(500).json({ error: "Server error." })
    }
}
import { Request, Response } from 'express';
import { getAllMyChats } from '../service/chat.service';

export const createSupportTicket = async(req:Request, res:Response) => {
    try{

    }catch(error){
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
        return res.status(200).json({message:"Successfully found chats.", supportChats: supportChats.map((chat) => {chat.toJSON})})
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
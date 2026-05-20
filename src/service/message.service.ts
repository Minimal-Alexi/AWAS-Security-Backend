import { Message } from "../models/message.model";
import { User } from "../models/user.model";

const pool = require('../config/database').pool;
export const getAllMessagesFromChat = async (id:number):Promise<Array<Message>> => {
    const chatMessages:Array<Message> = [];
    return chatMessages;
}
export const findMaxOrderFromChat = async(chatId:number):Promise<number> => {
    return 0;
}
export const createMessageForChat = async(chatId:number,userId:number,text:string):Promise<Message> => {
    
}
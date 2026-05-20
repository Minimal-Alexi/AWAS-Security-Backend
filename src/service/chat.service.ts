import { Chat } from "../models/chat.model";
import { User } from "../models/user.model";
import { createMessageForChat, getAllMessagesFromChat } from "./message.service";

const pool = require('../config/database').pool;
export const findChatById = async(id:number):Promise<Chat | null> => {
    const result = await pool.query('SELECT * FROM support_chat WHERE support_chat_id = $1', [id]);
    const row = result.rows[0];

    if(!row){
        return null;
    }
    
    const messages = await getAllMessagesFromChat(id);
    return new Chat(
        row.user_id,
        row.support_chat_id,
        messages
    )
}
export const createSupportChat = async(user:User, initialMessage:string):Promise<Chat> => {
    const result = await pool.query(`INSERT INTO support_chat (user_id) VALUES ($1) RETURNING *`,[user.id])
    const chatRow = result.rows[0];

    const chat = new Chat(user.id,chatRow.support_chat_id,[]);

    const startingMessage = await createMessageForChat(chat.supportChatId,user,initialMessage);
    chat.messages.push(startingMessage);

    return chat;
} 
export const getAllMyChats = async(userId:number):Promise<Array<Chat>> => {
    const result = await pool.query('SELECT * FROM support_chat WHERE user_id = $1',
        [userId]
    )

    const chatsArray:Array<Chat> = []

    for(const chat of result.rows){
        chatsArray.push(new Chat(chat.user_id,chat.support_chat_id,[]))
    }

    return chatsArray;

}
export const getAllChats = async():Promise<Array<Chat>> => {
    const result = await pool.query('SELECT * FROM support_chat');

    const chatsArray:Array<Chat> = []

    for(const chat of result.rows){
        chatsArray.push(new Chat(chat.user_id,chat.support_chat_id,[]))
    }

    return chatsArray;
}
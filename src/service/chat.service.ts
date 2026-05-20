import { Chat } from "../models/chat.model";
import { getAllMessagesFromChat } from "./message.service";

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
export const createSupportChat = async() => {

} 
export const getAllMyChats = async(userId:number) => {
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
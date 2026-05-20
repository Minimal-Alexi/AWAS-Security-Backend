import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { findUserById } from "./user.service";

const pool = require('../config/database').pool;
export const getAllMessagesFromChat = async (id:number):Promise<Array<Message>> => {
    const result = await pool.query(`SELECT 
            m.message_id,
            m.support_chat_id,
            m.user_id,
            m.text,
            m.order_nr,
            u.first_name,
            u.last_name,
            u.admin
            FROM message m
            JOIN users u ON u.user_id = m.user_id
            WHERE m.support_chat_id = $1
            ORDER BY m.order_nr ASC;`, [id]);

    const chatMessages:Array<Message> = [];
    for(const message of result.rows){
        const user = new User(message.user_id,message.first_name,message.last_name,"irrelevant","irrelevant",0,message.admin);
        chatMessages.push(new Message(message.message_id,message.support_chat_id,user,message.order,message.text))
    }
    return chatMessages;
}
export const findMaxOrderFromChat = async(chatId:number):Promise<number> => {
      const orderResult = await pool.query(
    `
    SELECT COALESCE(MAX(order_nr), 0) + 1 AS next_order
    FROM message
    WHERE support_chat_id = $1;
    `,
    [chatId]
  );

  const orderNr = orderResult.rows[0].next_order;
  return orderNr
}
export const createMessageForChat = async(chatId:number,user:User,text:string):Promise<Message> => {
    const order = await findMaxOrderFromChat(chatId);
    const result = await pool.query(`
        INSERT INTO message (support_chat_id,user_id,order_nr,text) VALUES ($1, $2, $3, $4) RETURNING *
        `,[chatId,user.id,order,text])
    
    const row = result.rows[0]

    return new Message(
        row.message_id,
        row.support_chat_id,
        user,
        row.order_nr,
        row.text
    )
}
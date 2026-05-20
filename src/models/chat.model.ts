import { Message } from "./message.model";

export class Chat{
    userId:number;
    supportChatId:number;
    messages: Array<Message>

    constructor(userId:number,supportChatId:number,messages: Array<Message>){
        this.userId = userId
        this.supportChatId = supportChatId
        this.messages = messages

        this.messages = this.messages.sort((a, b) => a.order - b.order);
    }

    toJSON() {
        return {
            userId: this.userId,
            supportChatId: this.supportChatId,
            messages: this.messages.map((mes) => mes.toJSON())
        }
    }

}
import { User } from "./user.model";

export class Message {
    messageId:number;
    supportChatId:number;
    user:User;
    order:number;
    text:string;



    constructor(messageId:number, supportChatId:number, user:User, order:number, text:string) {
        this.messageId = messageId;
        this.supportChatId = supportChatId;
        this.user = user;
        this.order = order;
        this.text = text;
    }

    toJSON() {
        return {
            id:this.messageId,
            supportChatId:this.supportChatId,
            user:{
                userId:this.user.id,
                firstName:this.user.firstName,
                lastName:this.user.lastName,
                admin:this.user.admin
            },
            order:this.order,
            text:this.text
        }
    }
}



import { serverTimestamp } from "@angular/fire/firestore";

export class User {

    id: string;
    name: string;
    email: string;
    avatar: number;
    online: boolean;
    createdAt: Date;
    chatIDs: string[];

    constructor(userObj: any) {
        this.id = userObj.id ? userObj.id : '';
        this.name = userObj.name ? userObj.name : '';
        this.email = userObj.email ? userObj.email : '';
        this.avatar = userObj.avatar ? userObj.avatar : '';
        this.online = userObj.online ? userObj.online : false;
        this.createdAt = userObj.createdAt ? (userObj.createdAt as any).toDate() : serverTimestamp();
        this.chatIDs = userObj.chatIDs ? userObj.chatIDs : [];
    }
}
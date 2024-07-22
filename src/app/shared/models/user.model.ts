export class User {

    id: string;
    name: string;
    email: string;
    avatar: number;
    online: boolean;
    chatIDs: string[];

    constructor(userObj: any) {
        this.id = userObj.id ? userObj.id : '';
        this.name = userObj.name ? userObj.name : '';
        this.email = userObj.email ? userObj.email : '';
        this.avatar = userObj.avatar ? userObj.avatar : '';
        this.online = userObj.online ? userObj.online : false;
        this.chatIDs = userObj.chatIDs ? userObj.chatIDs : [];
    }
}
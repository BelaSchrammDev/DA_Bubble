export class Chat {
    id: string;
    memberIDs: string[]; // User ids
    messageIDs: string[];

    constructor(data: any) {
        this.id = data.id ? data.id : '';
        this.memberIDs = data.memberIDs ? data.memberIDs : [];
        this.messageIDs = data.messageIDs ? data.messageIDs : [];
    }
}
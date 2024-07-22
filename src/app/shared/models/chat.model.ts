export class Chat {
    id: string;
    memberIDs: string[]; // User ids

    constructor(data: any) {
        this.id = data.id ? data.id : '';
        this.memberIDs = data.memberIDs ? data.memberIDs : [];
    }
}
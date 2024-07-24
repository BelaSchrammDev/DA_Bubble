import { serverTimestamp } from "@angular/fire/firestore";

export class Channel {

  id: string;
  name: string; // unique!!! 
  description: string;
  createdAt: Date;
  creatorID: string; // User id
  chatID: string; // Chat id

  constructor(data: any) {
    this.id = data.id ? data.id : '';
    this.name = data.name ? data.name : 'New Channel';
    this.description = data.description ? data.description : '';
    this.createdAt = data.createdAt ? (data.createdAt as any).toDate() : serverTimestamp();
    this.creatorID = data.creatorID ? data.creatorID : '';
    this.chatID = data.chatID ? data.chatID : '';
  }
}
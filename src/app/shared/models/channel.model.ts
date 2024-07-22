import { Chat } from "./chat.model";
import { Message } from "./message.model";

export class Channel {

  id: string;
  name: string; // unique!!! 
  description: string;
  created: number;
  creatorID: string; // User id
  chatID: string; // Chat id

  constructor(data: any) {
    this.id = data.id ? data.id : '';
    this.name = data.name ? data.name : 'New Channel';
    this.description = data.description ? data.description : '';
    this.created = data.created ? data.created : Date.now();
    this.creatorID = data.creatorID ? data.creatorID : '';
    this.chatID = data.chatID ? data.chatID : '';
  }
}
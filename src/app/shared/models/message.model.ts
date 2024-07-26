import { Timestamp } from "@angular/fire/firestore";

export class Message {
  [key: string]: any;
  id: string;
  creatorID: string;
  createdAt: Date;
  content: string;
  emojies: string[];
  answerable: boolean;

  constructor(data: any, answerable: boolean = false) {
    this.id = data.id ? data.id : '';
    this.creatorID = data.creatorID ? data.creatorID : '';
    this.createdAt = data.createdAt ? (data.createdAt as Timestamp).toDate() : new Date();
    this.content = data.content ? data.content : '';
    this.emojies = data.emojies ? data.emojies : [];
    this.answerable = answerable;
  }

}
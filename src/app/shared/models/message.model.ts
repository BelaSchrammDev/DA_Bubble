import { serverTimestamp } from "@angular/fire/firestore";

export class Message {
  id: string;
  creatorID: string;
  createdAt: Date;
  content: string;
  emojies: string[];
  answerable: boolean;

  constructor(data: any, answerable: boolean = false) {
    this.id = data.id ? data.id : '';
    this.creatorID = data.creatorID ? data.creatorID : '';
    this.createdAt = data.createdAt ? (data.createdAt as any).toDate() : serverTimestamp();
    this.content = data.content ? data.content : '';
    this.emojies = data.emojies ? data.emojies : [];
    this.answerable = answerable;
  }

  toJsonObject() {
    return {
      id: this.id,
      creatorID: this.creatorID,
      createdAt: this.createdAt,
      content: this.content,
      emojies: this.emojies,
      answerable: this.answerable
    }
  }
}
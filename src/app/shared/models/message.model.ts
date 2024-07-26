import { Timestamp } from "@angular/fire/firestore";

export class Message {
  id: string;
  creatorID: string;
  createdAt: Date;
  content: string;
  emojies: string[];
  answerable: boolean;
  answerCount: number;
  lastAnswerAt: Date;
  chatID: string;

  constructor(data: any) {
    this.id = data.id ? data.id : '';
    this.creatorID = data.creatorID ? data.creatorID : '';
    this.createdAt = data.createdAt ? (data.createdAt as Timestamp).toDate() : new Date();
    this.content = data.content ? data.content : '';
    this.emojies = data.emojies ? data.emojies : [];
    this.answerable = data.answerable;
    this.answerCount = data.answerCount ? data.answerCount : 0;
    this.lastAnswerAt = data.lastAnswerAt ? (data.lastAnswerAt as Timestamp).toDate() : new Date();
    this.chatID = data.chatID ? data.chatID : '';
  }

}
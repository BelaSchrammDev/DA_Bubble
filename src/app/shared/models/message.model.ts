export class Message {
  id: string;
  creatorID: string;
  created: number;
  content: string;
  emojies: string[];
  answerable: boolean;

  constructor(data: any, answerable: boolean) {
    this.id = data.id ? data.id : '';
    this.creatorID = data.creatorID ? data.creatorID : '';
    this.created = data.created ? data.created : Date.now();
    this.content = data.content ? data.content : '';
    this.emojies = data.emojies ? data.emojies : [];
    this.answerable = answerable;
  }

  toJsonObject() {
    return {
      id: this.id,
      creatorID: this.creatorID,
      created: this.created,
      content: this.content,
      emojies: this.emojies,
      answerable: this.answerable
    }
  }
}
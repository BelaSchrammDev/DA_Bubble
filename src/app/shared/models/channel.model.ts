import { User } from './user.model';

export class Channel {

    name: string;
    id: string;
    description: string;
    created: number;
    creator: string; // User id
    members: string[]; // User ids

  constructor(data: any) {
    this.name = data.name ? data.name : 'New Channel';
    this.id = data.id ? data.id : '';
    this.description = data.description ? data.description : '';
    this.created = data.created ? data.created : Date.now();
    this.creator = data.creator ? data.creator : '';
    this.members = data.members ? data.members : [];
  }
}
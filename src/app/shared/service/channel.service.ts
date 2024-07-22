import { Channel } from '../models/channel.model';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { addDoc, updateDoc, collection, Firestore, onSnapshot, doc } from '@angular/fire/firestore';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class ChannelService implements OnDestroy {

  private firestore = inject(Firestore);
  private userservice = inject(UsersService);
  private unsubChannels: any;

  public channels: Channel[] = [];
  public currentChannelID = '';

  constructor() {
    this.unsubChannels = onSnapshot(collection(this.firestore, '/channels'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.channels.push(new Channel(change.doc.data()));
        }
        if (change.type === 'modified') {
          this.channels = this.channels.map((channel) => {
            if (channel.id === change.doc.data()['id']) {
              return new Channel(change.doc.data());
            }
            return channel;
          });
        }
        if (change.type === 'removed') {
          this.channels = this.channels.filter((channel) => channel.id !== change.doc.data()['id']);
        }
        if (this.currentChannelID === '' && this.channels.length > 0) {
          this.currentChannelID = this.channels[0].id;
        }
      });
    });
  }

  async addChannelToFirestore(newchannel: any) {
    const channelObj = {
      name: newchannel.name,
      description: newchannel.description,
      created: Date.now(),
      creatorID: this.userservice.getCurrentUserID(),
      chatID: await this.addNewChatToFirestore(newchannel.memberIDs ? newchannel.memberIDs : this.userservice.getAllUsersAsIDList()),
    };
    let ref = collection(this.firestore, '/channels');
    let newChannel = await addDoc(ref, channelObj);
    await updateDoc(doc(this.firestore, '/channels/' + newChannel.id), { id: newChannel.id });
  }


  async addNewChatToFirestore(memberIDs: string[]) {
    const chatObj = {
      memberIDs: memberIDs,
      messageIDs: []
    };
    let ref = collection(this.firestore, '/chats');
    let newChat = await addDoc(ref, chatObj);
    await updateDoc(doc(this.firestore, '/chats/' + newChat.id), { id: newChat.id });
    return newChat.id;
  }


  getChannelByID(channelID: string): Channel | undefined {
    return this.channels.find((channel) => channel.id === channelID);
  }


  ngOnDestroy() {
    if (this.unsubChannels) {
      this.unsubChannels();
    }
  }
}

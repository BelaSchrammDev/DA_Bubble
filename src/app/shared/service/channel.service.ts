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
      });
    });
  }

  async addChannelToFirestore(channel: any) {
    const channelObj = {
      name: channel.name,
      description: channel.description,
      created: Date.now(),
      creator: this.userservice.getCurrentUserID(),
      members: channel.members ? channel.members : this.userservice.getAllUsersAsIDList(),
    };
    let ref = collection(this.firestore, '/channels');
    let newChannel = await addDoc(ref, channelObj);
    await updateDoc(doc(this.firestore, '/channels/' + newChannel.id), { id: newChannel.id });
  }


  ngOnDestroy() {
    if (this.unsubChannels) {
      this.unsubChannels();
    }
  }
}

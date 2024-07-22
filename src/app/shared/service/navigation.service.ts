import { inject, Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { UsersService } from './users.service';
import { Channel } from '../models/channel.model';
import { User } from '../models/user.model';
import { Chat } from '../models/chat.model';
import { collection, doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private firestore = inject(Firestore);
  private channelservice = inject(ChannelService);
  private usersservice = inject(UsersService);
  private _currentChannelID = '';


  private _currentUser: User | undefined;
  public get currentUser(): User | undefined {
    return this._currentUser;
  }
  public set currentUser(value: User | undefined) {
    this._currentUser = value;
  }

  private _currentChannel: Channel | undefined;
  public get currentChannel(): Channel | undefined {
    if (this._currentChannelID === '') {
      this.setCurrentChannel(this.channelservice.currentChannelID);
    }
    return this._currentChannel;
  }
  public set currentChannel(value: Channel | undefined) {
    this._currentChannel = value;
  }

  public currentChat: Chat | undefined;
  public privateMessage = false;

  public get currentChannelID(): string | undefined {
    return this._currentChannelID;
  }

  setCurrentChannel(channelID: string) {
    this.currentChannel = this.channelservice.getChannelByID(channelID);
    this._currentChannelID = channelID;
    this.privateMessage = false;
    if (this._currentChannel) {
      this.setCurrentChat(this._currentChannel.chatID);
    }
    else {
      this.currentChat = undefined;
    }
  }

  setCurrentUser(userID: string) {
    this.currentUser = this.usersservice.getUserByID(userID);
    this._currentChannelID = userID;
    this.privateMessage = true;
  }

  async setCurrentChat(chatID: string) {
    let chatDoc = await getDoc(doc(this.firestore, 'chats', chatID));
    this.currentChat = new Chat(chatDoc.data());
  }
}

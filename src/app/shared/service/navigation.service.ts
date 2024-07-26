import { inject, Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { UsersService } from './users.service';
import { Channel } from '../models/channel.model';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { Chat } from '../models/chat.model';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private channelservice = inject(ChannelService);
  private usersservice = inject(UsersService);
  private chatservice = inject(ChatService);

  public privateMessage = false;
  public currentUser: User | undefined;
  public currentChannel: Channel | undefined;
  public currentThread: Message | undefined;

  get currentChat(): Chat | undefined {
    return this.chatservice.chat;
  }

  setCurrentThread(message: Message) {
    this.currentThread = message;
  }

  setCurrentChat(chatID: string) {
    this.chatservice.setChatID(chatID);
  }

  setCurrentChannel(channelID: string) {
    this.currentChannel = this.channelservice.getChannelByID(channelID);
    this.setCurrentChat(this.currentChannel ? this.currentChannel.chatID : '');
    this.privateMessage = false;
  }


  setCurrentUser(userID: string) {
    this.currentUser = this.usersservice.getUserByID(userID);
    this.chatservice.setChatID('');
    this.privateMessage = true;
  }

}

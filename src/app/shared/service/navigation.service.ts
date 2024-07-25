import { inject, Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { UsersService } from './users.service';
import { Channel } from '../models/channel.model';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private channelservice = inject(ChannelService);
  private usersservice = inject(UsersService);

  public privateMessage = false;
  public currentUser: User | undefined;
  public currentChannel: Channel | undefined;
  public currentThread: Message | undefined;


  setCurrentThread(message: Message) {
    this.currentThread = message;
  }

  
  setCurrentChannel(channelID: string) {
    this.currentChannel = this.channelservice.getChannelByID(channelID);
    this.privateMessage = false;
  }


  setCurrentUser(userID: string) {
    this.currentUser = this.usersservice.getUserByID(userID);
    this.privateMessage = true;
  }

}

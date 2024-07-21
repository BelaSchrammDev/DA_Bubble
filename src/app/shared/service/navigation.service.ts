import { inject, Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { UsersService } from './users.service';
import { Channel } from '../models/channel.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

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
  public privateMessage = false;

  public get currentChannelID(): string | undefined {
    return this._currentChannelID;
  }

  setCurrentChannel(channelID: string) {
    this.currentChannel = this.channelservice.getChannelByID(channelID);
    this._currentChannelID = channelID;
    this.privateMessage = false;
  }

  setCurrentUser(userID: string) {
    this.currentUser = this.usersservice.getUserByID(userID);
    this._currentChannelID = userID;
    this.privateMessage = true;
  }
}

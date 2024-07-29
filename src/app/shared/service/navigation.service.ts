import { inject, Injectable, OnDestroy } from '@angular/core';
import { ChannelService } from './channel.service';
import { UsersService } from './users.service';
import { Channel } from '../models/channel.model';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { Chat } from '../models/chat.model';
import { ChatService } from './chat.service';
import { ThreadService } from './thread.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {

  constructor() {
    this.threadChangeSubcription = this.threadservice.change$.subscribe((change) => {
      this.changeSubject.next(change);
    });
  }

  ngOnDestroy(): void {
    if (this.threadChangeSubcription) {
      this.threadChangeSubcription.unsubscribe();
    }
  }

  private channelservice = inject(ChannelService);
  private usersservice = inject(UsersService);
  private chatservice = inject(ChatService);
  private threadservice = inject(ThreadService);
  private threadChangeSubcription: Subscription | undefined;

  private changeSubject = new BehaviorSubject<string>('');
  public change$ = this.changeSubject.asObservable();

  public privateMessage = false;
  public currentUser: User | undefined;
  public currentChannel: Channel | undefined;

  get currentChat(): Chat | undefined {
    return this.chatservice.chat;
  }

  setChangeState(state: string) {
    this.changeSubject.next(state);
  }

  setCurrentThread(message: Message | undefined) {
    this.threadservice.setThread(message);
    this.changeSubject.next('thread');
  }

  setCurrentChat(chatID: string) {
    this.chatservice.setChatID(chatID);
    this.changeSubject.next('chat');
  }

  setCurrentChannel(channelID: string) {
    this.setCurrentThread(undefined);
    this.currentChannel = this.channelservice.getChannelByID(channelID);
    this.setCurrentChat(this.currentChannel ? this.currentChannel.chatID : '');
    this.privateMessage = false;
    this.changeSubject.next('channel');
  }


  setCurrentUser(userID: string) {
    this.currentUser = this.usersservice.getUserByID(userID);
    this.chatservice.setChatID('');
    this.privateMessage = true;
    this.changeSubject.next('user');
  }

}

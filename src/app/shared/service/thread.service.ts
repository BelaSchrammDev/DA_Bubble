import { inject, Injectable, OnDestroy } from '@angular/core';
import { Message } from '../models/message.model';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Chat } from '../models/chat.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadService implements OnDestroy {

  public threadChat: Chat | undefined;
  public thread: Message | undefined;

  private changeSubcription = new BehaviorSubject<string>('');
  public change$ = this.changeSubcription.asObservable();

  private firestore = inject(Firestore);
  private unsubThreadChat: any;


  setThread(thread: Message | undefined): void {
    this.thread = thread;
    this.setThreadChatByID(thread ? thread.chatID : '');
  }


  setThreadChatByID(threadChatID: string): Chat | undefined {
    const oldThreadChatID = this.threadChat?.id;
    if (this.threadChat && oldThreadChatID != threadChatID) {
      this.unsubscribeThreadChat();
    }
    if (threadChatID !== '' && threadChatID !== oldThreadChatID) {
      this.subscribeThreadChat(threadChatID);
      return this.threadChat;
    }
    return undefined;
  }

  subscribeThreadChat(threadChatID: string) {
    this.unsubThreadChat = onSnapshot(doc(this.firestore, '/chats/' + threadChatID), (doc) => {
      this.threadChat = new Chat(doc.data());
      this.changeSubcription.next('thread');
    });
  }


  unsubscribeThreadChat(): void {
    if (this.unsubThreadChat) {
      this.unsubThreadChat();
      this.unsubThreadChat = undefined;
    }
    this.threadChat = undefined;
  }


  ngOnDestroy(): void {
    this.unsubscribeThreadChat();
  }


}

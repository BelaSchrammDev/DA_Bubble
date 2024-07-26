import { inject, Injectable, OnDestroy } from '@angular/core';
import { Message } from '../models/message.model';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ThreadService implements OnDestroy {

  public threadChat: Chat | undefined;
  public thread: Message | undefined;

  private firestore = inject(Firestore);
  private unsubThreadChat: any;

  
  setThread(thread: Message) {
    this.thread = thread;
    this.setThreadChatByID(thread.chatID);  
  }


  setThreadChatByID(threadChatID: string): Chat | undefined {
    if (threadChatID === '' || this.threadChat?.id !== threadChatID) {
      this.unsubscribeThreadChat();
    }
    if (threadChatID) {
      this.subscribeThreadChat(threadChatID);
      return this.threadChat;
    }
    return undefined;
  }

  subscribeThreadChat(threadChatID: string) {
    this.unsubThreadChat = onSnapshot(doc(this.firestore, '/chats/' + threadChatID), (doc) => {
      this.threadChat = new Chat(doc.data());
    });
  }


  unsubscribeThreadChat(): void {
    if (this.unsubThreadChat) {
      this.unsubThreadChat();
      this.unsubThreadChat = undefined;
    }
  }


  ngOnDestroy(): void {
    this.unsubscribeThreadChat();
  }


}

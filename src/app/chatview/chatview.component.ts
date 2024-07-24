import { Component, inject, Input, OnChanges, OnDestroy, SimpleChange, SimpleChanges } from '@angular/core';
import { Chat } from '../shared/models/chat.model';
import { collection, Firestore } from '@angular/fire/firestore';
import { onSnapshot } from '@firebase/firestore';
import { Message } from '../shared/models/message.model';
import { RendermessageComponent } from "./rendermessage/rendermessage.component";


@Component({
  selector: 'app-chatview',
  standalone: true,
  imports: [RendermessageComponent],
  templateUrl: './chatview.component.html',
  styleUrl: './chatview.component.scss'
})
export class ChatviewComponent implements OnDestroy, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
  }

  public messageList: Message[] = [];
  public renderItems: (Message | string)[] = [];
  public loading = true;

  private firestore = inject(Firestore);
  private _chat: Chat | undefined;
  private unsubChatMessages: any;
  private changes = false;

  @Input()
  public get chat(): Chat | undefined {
    return this._chat;
  }

  public set chat(value: Chat | undefined) {
    this._chat = value;
    this.unSubscribeChatMessages();
    this.messageList = [];
    this.renderItems = [];
    this.subscribeChatMessages();
  }


  ifMessage(item: Message | string): boolean {
    return typeof item !== 'string';
  }


  getString(item: Message | string): string | undefined {
    return typeof item === 'string' ? item : undefined;
  }


  getMessage(item: Message | string): Message | undefined {
    return typeof item !== 'string' ? (item as Message) : undefined;
  }


  constructor() {
    setInterval(() => {
      if (this.changes) {
        this.changes = false;
        this.messageList.sort((a, b) => { return Number(a.createdAt) - Number(b.createdAt); });
        this.messageList.forEach((item) => {
          if(!this.renderItems.includes(item)) this.renderItems.push(item);
        });
        this.loading = false;
        console.log('loading.....false');
      }
    }, 500);
  }


  subscribeChatMessages() {
    if (this.chat) {
      this.unsubChatMessages = onSnapshot(collection(this.firestore, 'chats', this.chat.id, 'messages'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          this.loading = true;
          console.log('loading.....true');
          this.changes = true;
          if (change.type === 'added') {
            this.messageList.push(new Message(change.doc.data()));
          }
          if (change.type === 'modified') {
            this.messageList = this.messageList.map((message) => {
              if (message.content === change.doc.data()['content']) {
                return new Message(change.doc.data());
              }
              return message;
            });
          }
          if (change.type === 'removed') {
            this.messageList = this.messageList.filter((message) => message.id !== change.doc.data()['id']);
          }
        });
      });
    }
  }


  unSubscribeChatMessages() {
    if (this.unsubChatMessages !== undefined) {
      this.unsubChatMessages();
      this.unsubChatMessages = undefined;
    }
  }


  ngOnDestroy(): void {
    this.unSubscribeChatMessages();
  }

}

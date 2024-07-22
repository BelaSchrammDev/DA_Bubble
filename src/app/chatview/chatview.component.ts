import { Component, inject, Input, OnChanges, OnDestroy, SimpleChange, SimpleChanges } from '@angular/core';
import { Chat } from '../shared/models/chat.model';
import { collection, Firestore, getDoc } from '@angular/fire/firestore';
import { doc, onSnapshot } from '@firebase/firestore';
import { ChatService } from '../shared/service/chat.service';
import { Message } from '../shared/models/message.model';

@Component({
  selector: 'app-chatview',
  standalone: true,
  imports: [],
  templateUrl: './chatview.component.html',
  styleUrl: './chatview.component.scss'
})
export class ChatviewComponent implements OnDestroy, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
  }

  public messageList: Message[] = [];

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
    this.subscribeChatMessages();
  }


  constructor() {
    // sorting messages by creating time
    setInterval(() => {
      if (this.changes) {
        this.changes = false;
        this.messageList.sort((a, b) => { return a.created - b.created; });
      }
    }, 500);
  }


  subscribeChatMessages() {
    if (this.chat) {
      this.unsubChatMessages = onSnapshot(collection(this.firestore, 'chats', this.chat.id, 'messages'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
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
        this.changes = true;
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

import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
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
export class ChatviewComponent implements OnDestroy {

  @Output() messageSelectedEvent = new EventEmitter<Message>();

  @Input() showAnswerCount = true;
  public messageList: Message[] = [];
  public loading = true;

  private firestore = inject(Firestore);
  private unsubChatMessages: any;
  
  private _chat: Chat | undefined;
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


  messageSelected(message: Message) {
    if(message.answerable) {
      this.messageSelectedEvent.emit(message);
    }
  }


  ifDaySeparatorNeeded(index: number): boolean {
    if (index === 0) {
      return true;
    }
    if (index > 0) {
      let currentMessage = this.messageList[index];
      let previousMessage = this.messageList[index - 1];
      return currentMessage.createdAt.getDate() !== previousMessage.createdAt.getDate();
    }
    return false;
  }


  getDaySeparatorText(index: number): string {
    let message = this.messageList[index];
    let date = message.createdAt;
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
      return 'Heute';
    }
    return this.getWeekdayGerman(date.getDay()) + ', ' + day + '. ' + this.getMonthGerman(month) + (year === new Date().getFullYear() ? '' : ' ' + year);
  }


  getWeekdayGerman(weekdayNumber: number): string {
    const weekday = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    return weekday[weekdayNumber];
  }


  getMonthGerman(monthNumber: number): string {
    const month = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    return month[monthNumber];
  }


  constructor(private _changeDetectorRef: ChangeDetectorRef) { }


  subscribeChatMessages() {
    if (this.chat) {
      this.unsubChatMessages = onSnapshot(collection(this.firestore, 'chats', this.chat.id, 'messages'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          this.loading = true;
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
        this.messageList.sort((a, b) => { return Number(a.createdAt) - Number(b.createdAt); });
        this._changeDetectorRef.detectChanges();
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

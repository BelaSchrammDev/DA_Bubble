import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../shared/service/navigation.service';
import { ChatviewComponent } from '../chatview/chatview.component';
import { WritemessageComponent } from '../shared/components/writemessage/writemessage.component';
import { ChatService } from '../shared/service/chat.service';
import { CommonModule } from '@angular/common';
import { addDoc, collection, doc, Firestore, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { ChannelService } from '../shared/service/channel.service';
import { UsersService } from '../shared/service/users.service';
import { ThreadService } from '../shared/service/thread.service';
import { last, Subscription } from 'rxjs';
import { RendermessageComponent } from '../chatview/rendermessage/rendermessage.component';
import { Message } from '../shared/models/message.model';
import { Chat } from '../shared/models/chat.model';

@Component({
  selector: 'app-threadview',
  standalone: true,
  imports: [
    ChatviewComponent,
    WritemessageComponent,
    RendermessageComponent,
    CommonModule
  ],
  templateUrl: './threadview.component.html',
  styleUrl: './threadview.component.scss'
})
export class ThreadviewComponent implements OnInit, OnDestroy {

  private changeSubcription: Subscription | undefined;
  private firestore = inject(Firestore);
  private userservice = inject(UsersService);
  private chatservice = inject(ChatService);
  private threadservice = inject(ThreadService);
  private navigationService = inject(NavigationService);

  public thread: Message | undefined;
  public threadChat: Chat | undefined;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.changeSubcription = this.navigationService.change$.subscribe((change) => {
      if (this.thread != this.threadservice.thread || this.threadChat != this.threadservice.threadChat) {
        this.thread = this.threadservice.thread;
        this.threadChat = this.threadservice.threadChat;
        this.cdr.detectChanges();
      }
    });
  }


  ngOnDestroy(): void {
    if (this.changeSubcription) {
      this.changeSubcription.unsubscribe();
    }
  }


  closeThread() {
    this.navigationService.setCurrentThread(undefined);
  }


  async addAnswerToChat(messageText: string) {
    if (this.threadservice.thread && this.navigationService.currentChat && this.threadservice.thread.answerable) {
      if (!this.threadservice.thread.chatID) {
        this.threadservice.thread.chatID = await this.chatservice.addNewChatToFirestore([this.threadservice.thread.creatorID, this.userservice.getCurrentUserID()]);
      }
      let messageUpdateData = {
        chatID: this.threadservice.thread.chatID,
        answerCount: this.threadservice.thread.answerCount + 1,
        lastAnswered: serverTimestamp()
      };
      await updateDoc(doc(this.firestore, '/chats/' + this.navigationService.currentChat.id + '/messages/' + this.threadservice.thread.id), messageUpdateData);
      let newMessage = this.createNewMessageObject(messageText);
      await this.addChatMessageToFirestore(newMessage, '/chats/' + this.threadservice.thread.chatID + '/messages/');
    }
  }


  async addChatMessageToFirestore(message: any, messagesPath: string) {
    let ref = collection(this.firestore, messagesPath);
    let newMessageRef = await addDoc(ref, message);
    await updateDoc(doc(this.firestore, messagesPath + newMessageRef.id), { id: newMessageRef.id });
    message.id = newMessageRef.id;
  }


  createNewMessageObject(messageText: string) {
    return {
      creatorID: this.userservice.getCurrentUserID(),
      createdAt: serverTimestamp(),
      content: messageText,
      emojies: [],
      answerable: false
    };
  }


}

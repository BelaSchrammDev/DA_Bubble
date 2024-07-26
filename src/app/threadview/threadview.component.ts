import { Component, inject } from '@angular/core';
import { NavigationService } from '../shared/service/navigation.service';
import { ChatviewComponent } from '../chatview/chatview.component';
import { WritemessageComponent } from '../shared/components/writemessage/writemessage.component';
import { ChatService } from '../shared/service/chat.service';
import { CommonModule } from '@angular/common';
import { addDoc, collection, doc, Firestore, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { ChannelService } from '../shared/service/channel.service';
import { UsersService } from '../shared/service/users.service';
import { ThreadService } from '../shared/service/thread.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-threadview',
  standalone: true,
  imports: [
    ChatviewComponent,
    WritemessageComponent,
    CommonModule
  ],
  templateUrl: './threadview.component.html',
  styleUrl: './threadview.component.scss'
})
export class ThreadviewComponent {

  private firestore = inject(Firestore);

  public channelservice = inject(ChannelService);
  public userservice = inject(UsersService);
  public chatservice = inject(ChatService);
  public threadservice = inject(ThreadService);
  public navigationService = inject(NavigationService);


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

import { Component, inject } from '@angular/core';
import { ChannelService } from '../shared/service/channel.service';
import { UsersService } from '../shared/service/users.service';
import { PrivatmessageheadlineComponent } from './privatmessageheadline/privatmessageheadline.component';
import { ChannelheadlineComponent } from './channelheadline/channelheadline.component';
import { NavigationService } from '../shared/service/navigation.service';
import { ChatviewComponent } from '../chatview/chatview.component';
import { ChatService } from '../shared/service/chat.service';
import { WritemessageComponent } from '../shared/components/writemessage/writemessage.component';
import { addDoc, collection, doc, Firestore, serverTimestamp, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-channelview',
  standalone: true,
  imports: [
    WritemessageComponent,
    PrivatmessageheadlineComponent,
    ChannelheadlineComponent,
    ChatviewComponent
  ],
  templateUrl: './channelview.component.html',
  styleUrl: './channelview.component.scss'
})
export class ChannelviewComponent {

  private firestore = inject(Firestore);

  public channelservice = inject(ChannelService);
  public userservice = inject(UsersService);
  public chatservice = inject(ChatService);
  public navigationService = inject(NavigationService);


  async addMessageToChat(messageText: string) {
    if (this.navigationService.currentChat) {
      let newMessage = this.createNewMessageObject(messageText);
      await this.addChatMessageToFirestore(newMessage, '/chats/' + this.navigationService.currentChat.id + '/messages/');
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
      answerable: true,
      answerCount: 0,
    };
  }

}

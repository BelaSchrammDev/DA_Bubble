import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Message } from '../../models/message.model';
import { UsersService } from '../../service/users.service';
import { Chat } from '../../models/chat.model';

@Component({
  selector: 'app-writemessage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './writemessage.component.html',
  styleUrl: './writemessage.component.scss'
})
export class WritemessageComponent {
  @Input() public chat: Chat | undefined;

  private firestore = inject(Firestore);
  private userservice = inject(UsersService);

  public messagetext: string = '';
  public sending: boolean = false;


  async sendMessage() {
    if (this.chat) {
      this.sending = true;
      let newMessage = this.createNewMessageObject();
      await this.addChatMessageToFirestore(newMessage);
      this.sending = false;
      this.messagetext = '';
    }
  }


  async addChatMessageToFirestore(message: Message) {
    if (this.chat) {
      const messagesPath = '/chats/' + this.chat.id + '/messages/';
      let ref = collection(this.firestore, messagesPath);
      let newMessageRef = await addDoc(ref, message.toJsonObject());
      await updateDoc(doc(this.firestore, messagesPath + newMessageRef.id), { id: newMessageRef.id });
      message.id = newMessageRef.id;
    }
  }


  createNewMessageObject(): Message {
    let newMessage = new Message({
      creatorID: this.userservice.getCurrentUserID(),
      content: this.messagetext
    }, false);
    return newMessage;
  }
}

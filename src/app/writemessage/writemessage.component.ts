import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Message } from '../shared/models/message.model';
import { UsersService } from '../shared/service/users.service';
import { Chat } from '../shared/models/chat.model';

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
      await this.addMessageToFirestore(newMessage);
      await this.addMessageIDToChat(newMessage.id);
      this.sending = false;
      this.messagetext = '';
    }
  }


  async addMessageToFirestore(message: Message) {
    let ref = collection(this.firestore, 'messages');
    let newMessageRef = await addDoc(ref, message.toJsonObject());
    await updateDoc(doc(this.firestore, '/messages/' + newMessageRef.id), { id: newMessageRef.id });
    message.id = newMessageRef.id;
  }


  createNewMessageObject(): Message {
    let newMessage = new Message({
      creatorID: this.userservice.getCurrentUserID(),
      content: this.messagetext
    }, false);
    return newMessage;
  }


  async addMessageIDToChat(messageID: string) {
    if(this.chat) {
      let ref = doc(this.firestore, '/chats/' + this.chat.id);
      await updateDoc(ref, { messageIDs: [...this.chat.messageIDs, messageID] });
      this.chat.messageIDs.push(messageID);
    }
  }
}

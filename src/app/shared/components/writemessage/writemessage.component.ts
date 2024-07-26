import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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

  @Output() public sendMessageEvent = new EventEmitter<string>();
  @Input() public chat: Chat | undefined;

  private firestore = inject(Firestore);
  private userservice = inject(UsersService);

  public messagetext: string = '';
  public sending: boolean = false;


  emitSendMessageEvent() {
    this.sendMessageEvent.emit(this.messagetext);
  }

}

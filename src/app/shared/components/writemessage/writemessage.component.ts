import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  public messagetext: string = '';
  public sending: boolean = false;


  emitSendMessageEvent() {
    this.sendMessageEvent.emit(this.messagetext);
  }

}

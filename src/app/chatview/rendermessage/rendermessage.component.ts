import { Component, inject, Input } from '@angular/core';
import { Message } from '../../shared/models/message.model';
import { UserbadgeComponent } from "../../users/userbadge/userbadge.component";
import { UsersService } from '../../shared/service/users.service';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-rendermessage',
  standalone: true,
  imports: [UserbadgeComponent, CommonModule],
  templateUrl: './rendermessage.component.html',
  styleUrl: './rendermessage.component.scss'
})
export class RendermessageComponent {

  public userservice = inject(UsersService);
  public user: User | undefined;

  private _message: Message | undefined;
  @Input() set message(value: Message | undefined) {
    this._message = value;
    if (this._message?.creatorID) {
      this.user = this.userservice.getUserByID(this._message.creatorID);
    }
    }

    get message(): Message | undefined {
    return this._message;
    }

}

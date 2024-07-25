import { Component, inject, Input } from '@angular/core';
import { Message } from '../../shared/models/message.model';
import { UserbadgeComponent } from "../../shared/components/userbadge/userbadge.component";
import { UsersService } from '../../shared/service/users.service';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../shared/service/navigation.service';


@Component({
  selector: 'app-rendermessage',
  standalone: true,
  imports: [UserbadgeComponent, CommonModule],
  templateUrl: './rendermessage.component.html',
  styleUrl: './rendermessage.component.scss'
})
export class RendermessageComponent {

  private navigationService = inject(NavigationService);
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


    getCreatedAtTimeAsString(): string {
      if (this._message) {
        return this._message.createdAt.getHours() + ':' + this._message.createdAt.getMinutes();
      }
      return '';
    }

    selectThread() {
      if (this._message) {
        this.navigationService.setCurrentThread(this._message);
      }
    }
}

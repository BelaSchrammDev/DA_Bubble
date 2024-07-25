import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-userbadge',
  standalone: true,
  imports: [],
  templateUrl: './userbadge.component.html',
  styleUrl: './userbadge.component.scss'
})
export class UserbadgeComponent {
  @Input()  user: User | undefined;

  getUserAvatarImage(): string {
    return `assets/avatars/avatar${this.user?.avatar}.svg`;
  }

}

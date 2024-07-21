import { Component, inject } from '@angular/core';
import { UsersService } from '../../shared/service/users.service';
import { UserbadgeComponent } from '../../users/userbadge/userbadge.component';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [
    UserbadgeComponent
  ],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {
  public listdropdown = true;
  public userservice = inject(UsersService);

  toggleListDropdown() {
    this.listdropdown = !this.listdropdown;
  }

}

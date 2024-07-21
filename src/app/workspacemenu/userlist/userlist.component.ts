import { Component, inject } from '@angular/core';
import { UsersService } from '../../shared/service/users.service';
import { UserbadgeComponent } from '../../users/userbadge/userbadge.component';
import { User } from '../../shared/models/user.model';
import { NavigationService } from '../../shared/service/navigation.service';

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
  private navigationService = inject(NavigationService);

  toggleListDropdown() {
    this.listdropdown = !this.listdropdown;
  }


  selectUser(event: Event, user: User) {
    this.navigationService.setCurrentUser(user.id);
    event.stopPropagation();
  }

}

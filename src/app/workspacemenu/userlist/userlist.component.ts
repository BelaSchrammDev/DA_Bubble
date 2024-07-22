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

  addDefaultUsers() {
    const defaultUsers = [
      { name: 'John Doe', email: 'john@gmail.com', avatar: 1, password: '123' },
      { name: 'Jane Doe', email: 'jane@gmail.com', avatar: 2, password: '123' },
      { name: 'Alice', email: 'alice@gmail.com', avatar: 3, password: '123' },
      { name: 'Bob', email: 'bob@gmail.com', avatar: 4, password: '123' },
      { name: 'Charlie', email: 'charlie@gmail.com', avatar: 5, password: '123' },
      { name: 'David', email: 'david@aol.de', avatar: 1, password: '123' },
      { name: 'Eve', email: 'eve@online.dev', avatar: 2, password: '123' },
    ];
    defaultUsers.forEach(user => {
      this.userservice.addUserToFirestore(user, user.password);
    });
  }
}

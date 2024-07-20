import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { addDoc, onSnapshot, setDoc, updateDoc, doc, collection, Firestore } from '@angular/fire/firestore';
import { UsersService } from './shared/service/users.service';
import { User } from './shared/models/user.model';
import { UserbadgeComponent } from "./users/userbadge/userbadge.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserbadgeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dabubble';
  public userservice = inject(UsersService);

  private defaultUsers = [
    {
      name: 'Bela',
      email: 'belaschramm@aol.de',
      avatar: 1,
    },
    {
      name: 'Irena',
      email: 'iraneschramm@aol.de',
      avatar: 2,
    },
    {
      name: 'Conny',
      email: 'connyschramm@aol.de',
      avatar: 3,
    },
    {
      name: 'Caro',
      email: 'carolinmueller@aol.de',
      avatar: 4,
    },
  ];

  addUsers() {
    this.defaultUsers.forEach((user: any) => {
      this.userservice.addUserToFirestore(user, '123456');

    });
  }
}

import { inject, Injectable, OnDestroy } from '@angular/core';
import { addDoc, updateDoc, collection, Firestore, onSnapshot, setDoc, doc } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {

  private firestore = inject(Firestore);
  private unsubUsers: any;

  public users: User[] = [];
  public currentUser: User | undefined;

  constructor() {
    this.unsubUsers = onSnapshot(collection(this.firestore, '/users'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.users.push(new User(change.doc.data()));
        }
        if (change.type === 'modified') {
          this.users = this.users.map((user) => {
            if (user.email === change.doc.data()['email']) {
              return new User(change.doc.data());
            }
            return user;
          });
        }
        if (change.type === 'removed') {
          this.users = this.users.filter((user) => user.email !== change.doc.data()['email']);
        }
      });
    });
  }


  async addUserToFirestore(user: any, password: string) {
    const userObj = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      password: password,
      online: false
    };
    let ref = collection(this.firestore, '/users');
    let newUser = await addDoc(ref, userObj);
    await updateDoc(doc(this.firestore, '/users/' + newUser.id), { id: newUser.id });
  }


  getAllUsersAsIDList(): string[] {
    return this.users.map((user) => user.id);
  }


  getCurrentUserID(): string {
    return this.users[0].id;
  }


  setUserOnline(email: string, online: boolean): void {
    const user = this.users.find((u) => u.email === email);
    if (user) {
      user.online = online;
    }
  }


  ngOnDestroy(): void {
    if (this.unsubUsers) {
      this.unsubUsers();
    }
  }
}

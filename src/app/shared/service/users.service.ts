import { inject, Injectable, OnDestroy } from '@angular/core';
import { addDoc, updateDoc, collection, Firestore, onSnapshot, setDoc, doc } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {

  private firestore = inject(Firestore);
  private firebaseauth = inject(Auth);
  private unsubUsers: any;

  public users: User[] = [];
  public currentUser: User | undefined;

  constructor() {
    this.unsubUsers = onSnapshot(collection(this.firestore, '/users'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.users.push(new User(change.doc.data()));
          // debug initial:
          if (this.currentUser === undefined) {
            this.currentUser = this.users[0];
          }
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


  registerNewUser(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseauth, email, password)
      .then((response) => {
        updateProfile(response.user, { displayName: '123456789' });
      })
    return from(promise);
  }


  async addUserToFirestore(user: any) {
    const userObj = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
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
    return this.currentUser ? this.currentUser.id : this.users[0].id;
  }


  getUserByID(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
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

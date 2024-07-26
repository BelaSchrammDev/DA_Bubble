import { inject, Injectable, OnDestroy } from '@angular/core';
import { addDoc, collection, doc, Firestore, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {

  public chat: Chat | undefined;

  private firestore = inject(Firestore);
  private unsubChat: any;
  private chatID: string | undefined;


  async addNewChatToFirestore(memberIDs: string[]) {
    const chatObj = {
      memberIDs: memberIDs,
    };
    let ref = collection(this.firestore, '/chats');
    let newChat = await addDoc(ref, chatObj);
    await updateDoc(doc(this.firestore, '/chats/' + newChat.id), { id: newChat.id });
    return newChat.id;
  }


  getChatID(): string | undefined {
    return this.chatID;
  }


  setChatID(chatID: string): Chat | undefined {
    if (this.chatID !== chatID) {
      this.unsubscribeChat();
      this.chatID = chatID;
      if (chatID != '') {
        this.subscribeChat(chatID);
        return this.chat;
      }
    }
    return undefined;
  }



  subscribeChat(chatID: string) {
    this.chatID = chatID;
    this.unsubChat = onSnapshot(doc(this.firestore, '/chats/' + chatID), (doc) => {
      this.chat = new Chat(doc.data());
    });
  }


  unsubscribeChat() {
    if (this.unsubChat) {
      this.unsubChat();
      this.unsubChat = undefined;
      this.chatID = undefined;
    }
  }


  ngOnDestroy(): void {
    this.unsubscribeChat();
  }
}

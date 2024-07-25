import { Component, inject } from '@angular/core';
import { NavigationService } from '../shared/service/navigation.service';
import { ChatviewComponent } from '../chatview/chatview.component';
import { WritemessageComponent } from '../shared/components/writemessage/writemessage.component';
import { ChatService } from '../shared/service/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-threadview',
  standalone: true,
  imports: [
    ChatviewComponent,
    WritemessageComponent,
    CommonModule
  ],
  templateUrl: './threadview.component.html',
  styleUrl: './threadview.component.scss'
})
export class ThreadviewComponent {

  public navigationService = inject(NavigationService);
  public chatservice = inject(ChatService);

}

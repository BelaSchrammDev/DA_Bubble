import { Component, inject, Input } from '@angular/core';
import { ChannelService } from '../shared/service/channel.service';
import { UsersService } from '../shared/service/users.service';
import { PrivatmessageheadlineComponent } from './privatmessageheadline/privatmessageheadline.component';
import { ChannelheadlineComponent } from './channelheadline/channelheadline.component';
import { NavigationService } from '../shared/service/navigation.service';
import { ChatviewComponent } from '../chatview/chatview.component';
import { ChatService } from '../shared/service/chat.service';
import { WritemessageComponent } from '../shared/components/writemessage/writemessage.component';

@Component({
  selector: 'app-channelview',
  standalone: true,
  imports: [
    WritemessageComponent,
    PrivatmessageheadlineComponent,
    ChannelheadlineComponent,
    ChatviewComponent
  ],
  templateUrl: './channelview.component.html',
  styleUrl: './channelview.component.scss'
})
export class ChannelviewComponent {
  public channelservice = inject(ChannelService);
  public userservice = inject(UsersService);
  public chatservice = inject(ChatService);
  public navigationService = inject(NavigationService);

}

import { Component, inject, Input } from '@angular/core';
import { WritemessageComponent } from '../writemessage/writemessage.component';
import { ChannelService } from '../shared/service/channel.service';
import { UsersService } from '../shared/service/users.service';
import { PrivatmessageheadlineComponent } from './privatmessageheadline/privatmessageheadline.component';
import { ChannelheadlineComponent } from './channelheadline/channelheadline.component';
import { NavigationService } from '../shared/service/navigation.service';

@Component({
  selector: 'app-channelview',
  standalone: true,
  imports: [
    WritemessageComponent,
    PrivatmessageheadlineComponent,
    ChannelheadlineComponent
  ],
  templateUrl: './channelview.component.html',
  styleUrl: './channelview.component.scss'
})
export class ChannelviewComponent {
  public channelservice = inject(ChannelService);
  public userservice = inject(UsersService);
  public navigationService = inject(NavigationService);

}

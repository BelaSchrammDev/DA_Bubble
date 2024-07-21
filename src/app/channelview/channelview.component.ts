import { Component, inject } from '@angular/core';
import { WritemessageComponent } from '../writemessage/writemessage.component';
import { ChannelService } from '../shared/service/channel.service';

@Component({
  selector: 'app-channelview',
  standalone: true,
  imports: [
    WritemessageComponent
  ],
  templateUrl: './channelview.component.html',
  styleUrl: './channelview.component.scss'
})
export class ChannelviewComponent {
  public channelservice = inject(ChannelService);

}

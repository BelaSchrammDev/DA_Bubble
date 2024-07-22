import { Component, inject } from '@angular/core';
import { ChannelService } from '../../shared/service/channel.service';
import { NavigationService } from '../../shared/service/navigation.service';
import { Channel } from '../../shared/models/channel.model';

@Component({
  selector: 'app-channellist',
  standalone: true,
  imports: [],
  templateUrl: './channellist.component.html',
  styleUrl: './channellist.component.scss'
})
export class ChannellistComponent {

  private navigationService = inject(NavigationService);

  public channelservice = inject(ChannelService);
  public listdropdown = true;

  toggleListDropdown() {
    this.listdropdown = !this.listdropdown;
  }

  addChannel(event: Event) {
    event.stopPropagation();
  }

  selectChannel(event: Event, channel: Channel) {
    event.stopPropagation();
    this.navigationService.setCurrentChannel(channel.id);
  }

  addchannels() {
    const defaultChannels = [
      {name: 'General', description: 'General Channel'},
      {name: 'Random', description: 'Random Channel'},
      {name: 'News', description: 'News Channel'},
      {name: 'Tech', description: 'Tech Channel'},
      {name: 'Music', description: 'Music Channel'}
    ];
    defaultChannels.forEach(channel => {
      this.channelservice.addChannelToFirestore(channel);
    });
  }

}

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
    this.channelservice.addChannelToFirestore({name: 'New Channel', description: 'New Channel Description'});
    // add 5 channels
    this.channelservice.addChannelToFirestore({name: 'Channel 1', description: 'Channel 1 Description'});
    this.channelservice.addChannelToFirestore({name: 'Channel 2', description: 'Channel 2 Description'});
    this.channelservice.addChannelToFirestore({name: 'Channel 3', description: 'Channel 3 Description'});
    this.channelservice.addChannelToFirestore({name: 'Channel 4', description: 'Channel 4 Description'});
    this.channelservice.addChannelToFirestore({name: 'Channel 5', description: 'Channel 5 Description'});
  }

}

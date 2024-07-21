import { Component } from '@angular/core';

@Component({
  selector: 'app-channellist',
  standalone: true,
  imports: [],
  templateUrl: './channellist.component.html',
  styleUrl: './channellist.component.scss'
})
export class ChannellistComponent {
  public listdropdown = true;

  toggleListDropdown() {
    console.log('Toggle list dropdown');
    this.listdropdown = !this.listdropdown;
  }

  addChannel(event: Event) {
    event.stopPropagation();
    console.log('Add channel');
  }

}

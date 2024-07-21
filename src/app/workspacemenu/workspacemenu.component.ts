import { Component } from '@angular/core';
import { UserlistComponent } from './userlist/userlist.component';
import { ChannellistComponent } from './channellist/channellist.component';

@Component({
  selector: 'app-workspacemenu',
  standalone: true,
  imports: [
    UserlistComponent,
    ChannellistComponent
  ],
  templateUrl: './workspacemenu.component.html',
  styleUrl: './workspacemenu.component.scss'
})
export class WorkspacemenuComponent {

}

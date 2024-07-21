import { Component, inject } from '@angular/core';
import { NavigationService } from '../../shared/service/navigation.service';
import { UsersService } from '../../shared/service/users.service';
import { UserbadgeComponent } from '../../users/userbadge/userbadge.component';

@Component({
  selector: 'app-channelheadline',
  standalone: true,
  imports: [
    UserbadgeComponent
  ],
  templateUrl: './channelheadline.component.html',
  styleUrl: './channelheadline.component.scss'
})
export class ChannelheadlineComponent {

  public navigationService = inject(NavigationService);
  public userservice = inject(UsersService);

}

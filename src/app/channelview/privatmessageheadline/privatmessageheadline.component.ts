import { Component, inject } from '@angular/core';
import { UserbadgeComponent } from "../../shared/components/userbadge/userbadge.component";
import { NavigationService } from '../../shared/service/navigation.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-privatmessageheadline',
  standalone: true,
  imports: [
    UserbadgeComponent
  ],
  templateUrl: './privatmessageheadline.component.html',
  styleUrl: './privatmessageheadline.component.scss'
})
export class PrivatmessageheadlineComponent {

  public navigationService = inject(NavigationService);


}

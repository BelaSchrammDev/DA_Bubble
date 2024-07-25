import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { WorkspacemenuComponent } from './workspacemenu/workspacemenu.component';
import { ChannelviewComponent } from './channelview/channelview.component';
import { ThreadviewComponent } from './threadview/threadview.component';
import { NavigationService } from './shared/service/navigation.service';
import { UsersService } from './shared/service/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    WorkspacemenuComponent,
    ChannelviewComponent,
    ThreadviewComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'dabubble';

  private navigationService = inject(NavigationService);
  private userservice = inject(UsersService);

  ngOnInit(): void {
    if (this.navigationService && this.userservice && this.userservice.currentUser) {
      this.navigationService.setCurrentChannel(this.userservice.currentUser.id);
    }
  }

}

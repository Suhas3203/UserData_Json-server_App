import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServService } from 'src/app/user-serv.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  logoutFromAPP() {
    this.userService.logout();
  }

  constructor(private userService: UserServService) {}
}

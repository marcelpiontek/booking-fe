import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: User;


  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  isAuthenticated() {
    return this.user ? this.user.authenticated : false;
  }

  logout() {
    this.authenticationService.logout();
  }

  login() {
    this.router.navigateByUrl('/login');
  }

}

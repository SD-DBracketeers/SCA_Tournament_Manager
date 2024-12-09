import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private login: LoginService) {}
  username = '';
  password = '';
  loggedIn = '';

  onSubmit(): void {
    this.login.doLogin(this.username, this.password).subscribe((data) => {
      // Iterate through the entries if necessary, or process data directly
      Object.entries(data).forEach(() => {
        this.loggedIn = 'logged in';
        localStorage.setItem('loggedIn', this.loggedIn);
        this.router.navigate(['/']);
      });
    });
    // Login logic goes here
  }
}

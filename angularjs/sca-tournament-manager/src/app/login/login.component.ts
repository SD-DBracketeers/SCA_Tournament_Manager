import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private login: LoginService) {}
  username: string = '';
  password: string = '';
  loggedIn: string = '';

  onSubmit(): void {
    this.login.doLogin(this.username, this.password).subscribe((data) =>{
      var entries = Object.entries(data);
      entries.forEach(key => {
        this.loggedIn = 'logged in';
        localStorage.setItem('loggedIn', this.loggedIn);
        this.router.navigate(['/']);
      });
    });
    // Login logic goes here
  }
}

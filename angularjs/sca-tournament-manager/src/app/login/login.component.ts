import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}
  username: string = '';
  password: string = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    // Login logic goes here
  }
}

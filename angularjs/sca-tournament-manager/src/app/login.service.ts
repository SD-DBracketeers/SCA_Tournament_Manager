import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  doLogin(username: string, password: string) {
    return this.http.get('http://localhost:8080/login/' + username + '/' + password);
  }
}

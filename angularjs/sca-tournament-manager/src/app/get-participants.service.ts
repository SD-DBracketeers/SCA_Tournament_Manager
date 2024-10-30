import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetParticipantsService {

  constructor(public http: HttpClient) { }

  getParticipants() {
    return this.http.get('http://localhost:8080/participants');
  }
}

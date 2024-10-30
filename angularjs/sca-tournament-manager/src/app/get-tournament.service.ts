import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetTournamentService {

  constructor(public http: HttpClient) { }

  getTournaments() {
    return this.http.get('http://localhost:8080/tournaments');
  }
}

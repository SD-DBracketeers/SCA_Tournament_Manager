import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetTournamentByIdService {

  constructor(public http: HttpClient) { }

  getTournament(nanoId: string) {
    return this.http.get('http://localhost:8080/tournaments/' + nanoId);
  }
}

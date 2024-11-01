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

  createTournaments(name: string, eventType: string, kingdom: string, location: string, date: Date, 
    description: string, participants: []) {
    return this.http.post('http://localhost:8080/tournaments', {
      name: name,
      eventType: eventType,
      kingdom: kingdom,
      location: location,
      description: description,
      tournamentParticipants: participants,
      progression: [],
      date: new Date(date).toISOString()
    }, {responseType: 'text'}).subscribe(
      response => {
        console.log('Request successful:', response);
        localStorage.setItem('nanoID', response);
      },
      error => console.error('Request failed:', error)
    );
  }
}

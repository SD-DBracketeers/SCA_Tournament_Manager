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
  getParticipantByID(nanoID: string) {
    return this.http.get('http://localhost:8080/participants/' + nanoID);
  }

  createParticipant(name: string, kingdom: string, combatType: string, rank: string, date: Date) {
    return this.http.post('http://localhost:8080/participants', {
      name: name,
      combatType: combatType,
      kingdom: kingdom,
      rank: rank,
      tournamentParticipantIn: [],
      verificationExperationDate: new Date(date).toISOString()
    }, {responseType: 'text'}).subscribe(
      response => {
        console.log('Request successful:', response);
        localStorage.setItem('nanoID', response);
      },
      error => console.error('Request failed:', error)
    );
  }
  updateParticipant(name: string, kingdom: string, combatType: string, rank: string, date: Date, nanoID: string) {
    return this.http.put('http://localhost:8080/participants/' + nanoID, {
      name: name,
      combatType: combatType,
      kingdom: kingdom,
      rank: rank,
      tournamentParticipantIn: [],
      verificationExperationDate: new Date(date).toISOString()
    }, {responseType: 'text'}).subscribe(
      response => {
        console.log('Request successful:', response);
        localStorage.setItem('nanoID', response);
      },
      error => console.error('Request failed:', error)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetTournamentService } from '../get-tournament.service';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit {
  constructor(private router: Router, public getTournament: GetTournamentService) {}
  // variables in the form
  name: string = '';
  eventType: string = '';
  kingdom: string = '';
  location: string = '';
  description: string = '';
  date: Date = new Date;
  participants: [] = [];
  participantNames: [] = [];

  // navigate to select participants
  navigateToParticipants() {
    this.saveFormData();
    this.router.navigate(['/search-participants']);
  }

  // submit the form
  submitForm() {
    this.saveFormData();
    this.createTournament(this.name, this.eventType, this.kingdom, this.location, this.date, this.description, this.participants);
  }

  // save the form fields in localStorage so they can be accessed when users return to the page
  saveFormData() {
    const formData = {
      name: this.name,
      eventType: this.eventType,
      kingdom: this.kingdom,
      location: this.location,
      description: this.description,
      date: this.date,
      participants: this.participants
    };
    localStorage.setItem('tournamentFormData', JSON.stringify(formData));
    localStorage.setItem('prevUrl', 'create-tournament');
  }

  // create the tournament, remove stuff from the localStorage, and redirect to bracket page
  createTournament(name: string, eventType: string, kingdom: string, location: string, date: Date, 
    description: string, participants: []) {
    this.getTournament.createTournaments(name, eventType, kingdom, location, date, 
      description, participants);
    localStorage.removeItem("participantsList");
    localStorage.removeItem("participantNames");
    localStorage.removeItem("tournamentFormData");
    localStorage.removeItem("prevUrl");
    var nanoID = localStorage.getItem('nanoID');
    this.router.navigate(['/bracket'], { state: { nanoId: nanoID } });
  }

  ngOnInit(): void {
    // restore saved form fields
    const savedData = localStorage.getItem('tournamentFormData');
    const savedParticipants = localStorage.getItem('participantsList');
    const savedParticipantNames = localStorage.getItem('participantNames');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.name = parsedData.name;
      this.eventType = parsedData.eventType;
      this.kingdom = parsedData.kingdom;
      this.location = parsedData.location;
      this.description = parsedData.description;
      this.date = parsedData.date;
    }
    if (savedParticipants) {
      const parsedData = JSON.parse(savedParticipants);
      this.participants = parsedData;
    }
    if (savedParticipantNames) {
      const parsedData = JSON.parse(savedParticipantNames);
      this.participantNames = parsedData;
    }
    localStorage.removeItem("prevUrl");
  }
}

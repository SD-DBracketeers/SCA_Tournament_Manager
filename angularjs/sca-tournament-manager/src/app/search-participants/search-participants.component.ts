import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GetParticipantsService } from '../get-participants.service';

@Component({
  selector: 'app-search-participants',
  templateUrl: './search-participants.component.html',
  styleUrls: ['./search-participants.component.css'],
})
export class SearchParticipantsComponent implements OnInit {
  constructor(private location: Location, public getParticipants: GetParticipantsService, private router: Router) {}

  goBack(): void {
    this.location.back(); // Navigate to the previous page for back arrow
  }

  searchQuery: string = ''; // Bound to the search input field

  participants: {name: string, rank: string, combatType: string, verificationExpirationDate: string, 
    kingdom: string, participantNanoID: string, isFound: boolean}[] = [];
  participantsList: string[] = [];
  participantNames: string[] = [];
  previousUrl: string = '';

  // add or remove participants from the tournament that is being created
  toggleParticipants (nanoID: string) {
    const savedData = localStorage.getItem('participantsList');
    const participant = this.participants.find(p => p.participantNanoID === nanoID);
    
    if (savedData && participant) {
      const parsedData = JSON.parse(savedData);
      this.participantsList = parsedData;
      // remove participant from tournament
      if (this.participantsList.includes(nanoID)) {
        let newList = this.participantsList.filter(item => item !== nanoID);
        let newNames = this.participantNames.filter(item => item !== participant.name);
        localStorage.setItem('participantsList', JSON.stringify(newList));
        localStorage.setItem('participantNames', JSON.stringify(newNames));
        this.participantNames = newNames;
        
        if (participant) {
          participant.isFound = false;
          return;
        }
      } else { // add participant to tournament
        this.participantsList.push(nanoID);
        this.participantNames.push(participant.name);
        localStorage.setItem('participantsList', JSON.stringify(this.participantsList));
        localStorage.setItem('participantNames', JSON.stringify(this.participantNames));
      }
    } else if (participant) { // add participant to tournament
      this.participantsList.push(nanoID);
      this.participantNames.push(participant.name);
      localStorage.setItem('participantsList', JSON.stringify(this.participantsList));
      localStorage.setItem('participantNames', JSON.stringify(this.participantNames));
    }
    if (participant) { // change the displayed button
      participant.isFound = true;
      return;
    }
  }

  // get the saved list of participants for the tournament
  getParticipantsList () {
    const savedData = localStorage.getItem('participantsList');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.participantsList = parsedData;
    }
    const savedNames = localStorage.getItem('participantsNames');
    if (savedNames) {
      const parsedData = JSON.parse(savedNames);
      this.participantNames = parsedData;
    }
  }

  // find out which page the page was accessed from
  getPreviousUrl () {
    const savedData = localStorage.getItem('prevUrl');
    if (savedData) {
      const parsedData = savedData;
      this.previousUrl = parsedData;
      localStorage.removeItem("prevUrl");
    }
    return this.previousUrl;
  }

  viewParticipant (nanoID: string) {
    this.router.navigate(['/view-participant'], { state: { nanoId: nanoID } });
  }
  updateParticipant(participant: {name: string, rank: string, combatType: string, verificationExpirationDate: string, 
    kingdom: string, participantNanoID: string}) {
    this.router.navigate(['/update-participant'], {state: {participant: participant}});
  }
  getLoggedInStatus() {
    return localStorage.getItem('loggedIn');
  }

  ngOnInit(): void {
    // get the whole list of participants
    this.getParticipants.getParticipants().subscribe((data) =>{
      var entries = Object.entries(data);
      entries.forEach(key => {
        this.getParticipantsList();
        if (this.participantsList.includes(key[1].participantNanoID)) {
          key[1].isFound = true;
        } else {
          key[1].isFound = false;
        }
        this.participants.push(key[1]);
      })
    });
    
  }
}

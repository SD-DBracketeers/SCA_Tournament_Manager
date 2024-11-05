import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GetParticipantsService } from '../get-participants.service';

@Component({
  selector: 'app-search-participants',
  templateUrl: './search-participants.component.html',
  styleUrls: ['./search-participants.component.css'],
})
export class SearchParticipantsComponent implements OnInit {
  constructor(private location: Location, public getParticipants: GetParticipantsService) {}

  goBack(): void {
    this.location.back(); // Navigate to the previous page for back arrow
  }

  searchQuery: string = ''; // Bound to the search input field

  participants: {name: string, rank: string, combatType: string, verificationExperationDate: string, 
    kingdom: string, participantNanoID: string, isFound: boolean}[] = [];
  participantsList: string[] = [];
  participantNames: string[] = [];
  previousUrl: string = '';

  toggleParticipants (nanoID: string) {
    const savedData = localStorage.getItem('participantsList');
    const participant = this.participants.find(p => p.participantNanoID === nanoID);
    
    if (savedData && participant) {
      const parsedData = JSON.parse(savedData);
      this.participantsList = parsedData;
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
      } else {
        this.participantsList.push(nanoID);
        this.participantNames.push(participant.name);
        localStorage.setItem('participantsList', JSON.stringify(this.participantsList));
        localStorage.setItem('participantNames', JSON.stringify(this.participantNames));
      }
    } else if (participant) {
      this.participantsList.push(nanoID);
      this.participantNames.push(participant.name);
      localStorage.setItem('participantsList', JSON.stringify(this.participantsList));
      localStorage.setItem('participantNames', JSON.stringify(this.participantNames));
    }
    if (participant) {
      participant.isFound = true;
      return;
    }
  }

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

  getPreviousUrl () {
    const savedData = localStorage.getItem('prevUrl');
    if (savedData) {
      const parsedData = savedData;
      this.previousUrl = parsedData;
      localStorage.removeItem("prevUrl");
    }
    return this.previousUrl;
  }

  ngOnInit(): void {
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

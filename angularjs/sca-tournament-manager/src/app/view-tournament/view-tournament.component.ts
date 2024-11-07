import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetTournamentByIdService } from '../get-tournament-by-id.service';
import { GetParticipantsService } from '../get-participants.service';
// import { Time } from '@angular/common';


@Component({
  selector: 'app-view-tournament',
  templateUrl: './view-tournament.component.html',
  styleUrls: ['./view-tournament.component.css']
})
export class ViewTournamentComponent implements OnInit {
  constructor(private router: Router, public getTournament: GetTournamentByIdService, public getParticipantById: GetParticipantsService) {}
  nav = this.router.getCurrentNavigation();
  state = this.nav?.extras?.state ?? null;
  tournaments: {name: string, location: string, date: string, description: string, eventType: string, tournamentNanoID: string, tournamentParticipants:[]}[] = []; 
  
  getParticipant(tournament: {name: string, location: string, date: string, 
    description: string, eventType: string, tournamentNanoID: string, tournamentParticipants:[]},
    index: number) {
    const newVal: {name: string, nanoID: string} = {
      name:'',
      nanoID:''
    }
    const nanoID = tournament.tournamentParticipants[index];
    console.log(tournament.tournamentParticipants);
    // this.getParticipantById.getParticipantByID(nanoID).subscribe((data)=> {
    //   var entries = Object.entries(data);
    //   entries.forEach(key => {
    //     if (key[0] === 'name') newVal.name = key[1];
    //     else if (key[0] === 'participantNanoID') newVal.nanoID = key[1];
    //   });
    // });
    console.log(tournament.tournamentParticipants);
  }

  getRounds(tournament: {name: string, location: string, date: string, 
    description: string, eventType: string, tournamentNanoID: string, tournamentParticipants:[]}) {
    if (tournament) {
      if (tournament.tournamentParticipants) {
        return Math.ceil(Math.log2(tournament.tournamentParticipants.length));
      }
    }
    return 0;
  }

  getNumParticipants(rounds: number, currentRound: number) {
    if (rounds > 0 && rounds < 1000 && currentRound > 0) {
      return Math.pow(2, rounds) / Math.pow(2, currentRound);
    } 
    return 0;
  }

  ngOnInit(): void {
    this.getTournament.getTournament(this.state?.['nanoId'] ?? null).subscribe((data) =>{
      var entries = Object.entries(data);
      const newEntry: { name: string, location: string, date: string, description: string, eventType: string, tournamentNanoID: string, tournamentParticipants:[] } = {
        name: '',
        location: '',
        date: '',
        description: '',
        eventType: '',
        tournamentNanoID: '',
        tournamentParticipants: []
      };
      
      entries.forEach(key => {
        if (key[0] === 'name') newEntry.name = key[1];
        else if (key[0] === 'location') newEntry.location = key[1];
        else if (key[0] === 'date') newEntry.date = key[1];
        else if (key[0] === 'description') newEntry.description = key[1];
        else if (key[0] === 'eventType') newEntry.eventType = key[1];
        else if (key[0] === 'tournamentNanoID') newEntry.tournamentNanoID = key[1];
        else if (key[0] === 'tournamentParticipants') newEntry.tournamentParticipants = key[1];
      });
      
      this.tournaments.push(newEntry);
    });
  }

  draggedParticipant: string | null = null;

  onDragStart(event: DragEvent, participantName: string): void {
    this.draggedParticipant = participantName;
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', participantName);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const droppedName = event.dataTransfer?.getData('text/plain');

    if (droppedName && target.tagName === 'P') {
      target.textContent = droppedName;
    }
  }

}

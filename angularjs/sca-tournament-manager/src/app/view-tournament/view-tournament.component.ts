import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetTournamentByIdService } from '../get-tournament-by-id.service';
import { GetParticipantsService } from '../get-participants.service';
import { GetTournamentService } from '../get-tournament.service';


@Component({
  selector: 'app-view-tournament',
  templateUrl: './view-tournament.component.html',
  styleUrls: ['./view-tournament.component.css']
})
export class ViewTournamentComponent implements OnInit {
  constructor(private router: Router, public getTournament: GetTournamentByIdService, 
    public getParticipantById: GetParticipantsService, private getTournaments: GetTournamentService) {}
  // variables
  nav = this.router.getCurrentNavigation();
  state = this.nav?.extras?.state ?? null;
  tournaments: {name: string, location: string, date: string, description: string, eventType: string, tournamentNanoID: string, 
    kingdom:string, tournamentParticipants:string[], progression:string[]}[] = []; 
  progressString: string = '';
  currentPosition: number = 0;
  champion: {name: String, nanoID: String} = {name: '', nanoID: ''};

  // get the number of tournament rounds
  getRounds(tournament: {name: string, location: string, date: string, 
    description: string, eventType: string, tournamentNanoID: string, tournamentParticipants:string[]}) {
    if (tournament) {
      if (tournament.tournamentParticipants) {
        return Math.ceil(Math.log2(tournament.tournamentParticipants.length));
      }
    }
    return 0;
  }

  // get the number of participants per round
  getNumParticipants(rounds: number, currentRound: number) {
    if (rounds > 0 && rounds < 1000 && currentRound > 0) {
      return Math.pow(2, rounds) / Math.pow(2, currentRound);
    } 
    return 0;
  }

  // update the tournament progression
  updateTournament() {
    const winner = localStorage.getItem('winner');
    if (winner) {
      this.tournaments[0].progression.push(winner);
      this.getTournaments.updateTournament(this.tournaments[0].tournamentNanoID, this.tournaments[0].name, this.tournaments[0].eventType, 
        this.tournaments[0].kingdom,this.tournaments[0].location, this.tournaments[0].date, this.tournaments[0].description,
        this.tournaments[0].tournamentParticipants, this.tournaments[0].progression
      );
      localStorage.removeItem('winner');
      this.router.navigate(['/']).then(() => {
        this.router.navigate(['/bracket'], { state: { nanoId: this.tournaments[0].tournamentNanoID } });
      });

    } else {
      alert('No changes have been made');
    }
  }
  getChamp() {
    var progressIndex = 0;
    var totalRounds = this.getRounds(this.tournaments[0]);
    var count = 1;
    while (count < totalRounds) {
      progressIndex += Math.pow(2, totalRounds) / Math.pow(2, count);
      count++;
    }
    var newVal = {name: '', nanoID: ''};
    if (this.tournaments[0].progression.length-1 >= progressIndex) {
      var nanoID = this.tournaments[0].progression[progressIndex];
      this.getParticipantById.getParticipantByID(nanoID).subscribe((data)=> {
        var entries = Object.entries(data);
        entries.forEach(key => {
          if (key[0] === 'name') newVal.name = key[1];
          else if (key[0] === 'participantNanoID') newVal.nanoID = key[1];
        });
      });
      return newVal;
    }
    return newVal;
  }

  ngOnInit(): void {
    // get tournament information
    this.getTournament.getTournament(this.state?.['nanoId'] ?? null).subscribe((data) =>{
      var entries = Object.entries(data);
      const newEntry: { name: string, location: string, date: string, description: string, eventType: string, tournamentNanoID: string, kingdom:string, tournamentParticipants:string[], progression:string[] } = {
        name: '',
        location: '',
        date: '',
        description: '',
        eventType: '',
        tournamentNanoID: '',
        kingdom: '',
        tournamentParticipants: [],
        progression: []
      };
      
      entries.forEach(key => {
        if (key[0] === 'name') newEntry.name = key[1];
        else if (key[0] === 'location') newEntry.location = key[1];
        else if (key[0] === 'date') newEntry.date = key[1];
        else if (key[0] === 'description') newEntry.description = key[1];
        else if (key[0] === 'eventType') newEntry.eventType = key[1];
        else if (key[0] === 'tournamentNanoID') newEntry.tournamentNanoID = key[1];
        else if (key[0] === 'kingdom') newEntry.kingdom = key[1];
        else if (key[0] === 'tournamentParticipants') newEntry.tournamentParticipants = key[1];
        else if (key[0] === 'progression') newEntry.progression = key[1];
      });
      
      this.tournaments.push(newEntry);
      this.progressString = JSON.stringify(newEntry);
      this.champion = this.getChamp();
    });
    

  }

  // make the participants draggable (not currently functioning)
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetParticipantsService } from '../get-participants.service';
import { GetTournamentByIdService } from '../get-tournament-by-id.service';

@Component({
  selector: 'app-view-participant',
  templateUrl: './view-participant.component.html',
  styleUrls: ['./view-participant.component.css'],
})
export class ViewParticipantComponent implements OnInit {
  constructor(private router: Router, public getTournament: GetTournamentByIdService, 
    public getParticipantById: GetParticipantsService) {}
  nav = this.router.getCurrentNavigation();
  state = this.nav?.extras?.state ?? null;
  name: string = '';
  rank: string = '';
  combatType: string = '';
  kingdom: string = '';
  wins: number = 0;
  losses: number = 0;
  tournaments: string[] = [];
  result: { tournamentNanoID: string; name: string; date: string }[] = [];

  getSingleTournament (tournamentNanoID: string) {
    this.getTournament.getTournament(tournamentNanoID ?? null).subscribe((data) =>{
      var entries = Object.entries(data);
      const newEntry: { tournamentNanoID: string; name: string; date: string } = {
        name: '',
        date: '',
        tournamentNanoID: ''
      };
      
      entries.forEach(key => {
        if (key[0] === 'name') newEntry.name = key[1];
        else if (key[0] === 'date') newEntry.date = key[1];
        else if (key[0] === 'tournamentNanoID') newEntry.tournamentNanoID = key[1];
      });
      console.log(newEntry);
      this.result.push(newEntry);
    });
  }

  getParticipant () {
    this.getParticipantById.getParticipantByID(this.state?.['nanoId'] ?? null).subscribe((data) => {
      var entries = Object.entries(data);
      entries.forEach(key => {
        if (key[0] === 'name') this.name = key[1];
        else if (key[0] === 'rank') this.rank = key[1];
        else if (key[0] === 'kingdom') this.kingdom = key[1];
        else if (key[0] === 'combatType') this.combatType = key[1];
        else if (key[0] === 'wins') this.wins = key[1];
        else if (key[0] === 'losses') this.losses = key[1];
        else if (key[0] === 'tournamentParticipantIn') this.tournaments = key[1];
      });
      var count = 0;
      while (count < this.tournaments.length) {
        console.log(this.tournaments);
        this.getSingleTournament(this.tournaments[count]);
        count++;
      }
    });
  }

  selectTournament (nanoID: string) {
    this.router.navigate(['/bracket'], { state: { nanoId: nanoID } });
  }

  ngOnInit(): void {
    this.getParticipant();
    
  }
}

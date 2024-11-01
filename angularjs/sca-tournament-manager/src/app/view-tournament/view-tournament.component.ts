import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetTournamentByIdService } from '../get-tournament-by-id.service';
import { Time } from '@angular/common';


@Component({
  selector: 'app-view-tournament',
  templateUrl: './view-tournament.component.html',
  styleUrls: ['./view-tournament.component.css']
})
export class ViewTournamentComponent implements OnInit {
  constructor(private router: Router, public getTournament: GetTournamentByIdService) {}
  nav = this.router.getCurrentNavigation();
  state = this.nav?.extras?.state ?? null;
  tournaments: {name: string, location: string, date: string, description: string, eventType: string, tournamentNanoID: string, participants:[]}[] = []; 
  ngOnInit(): void {
    this.getTournament.getTournament(this.state?.['nanoId'] ?? null).subscribe((data) =>{
      var entries = Object.entries(data);
      const newEntry: { name: string, location: string, date: string, description: string, eventType: string, tournamentNanoID: string, participants:[] } = {
        name: '',
        location: '',
        date: '',
        description: '',
        eventType: '',
        tournamentNanoID: '',
        participants: []
      };
      
      entries.forEach(key => {
        if (key[0] === 'name') newEntry.name = key[1];
        else if (key[0] === 'location') newEntry.location = key[1];
        else if (key[0] === 'date') newEntry.date = key[1];
        else if (key[0] === 'description') newEntry.description = key[1];
        else if (key[0] === 'eventType') newEntry.eventType = key[1];
        else if (key[0] === 'tournamentNanoID') newEntry.tournamentNanoID = key[1];
        else if (key[0] === 'participants') newEntry.participants = key[1];
      });
      
      this.tournaments.push(newEntry);
    });
    console.log(this.tournaments);
  }
}

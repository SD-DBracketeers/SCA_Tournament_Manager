import { Component, OnInit } from '@angular/core';
import { GetTournamentService } from '../get-tournament.service';
import { Time } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public getTournaments: GetTournamentService, private router: Router) { }

  tournaments: {name: string, location: string, date: Time, description: string, eventType: string, tournamentNanoID: string, participants:[]}[] = [];

  viewTournament(tournamentNanoID: string): void {
    this.router.navigate(['/bracket'], { state: { nanoId: tournamentNanoID } });
  }

  ngOnInit(): void {
    this.getTournaments.getTournaments().subscribe((data) =>{
      var entries = Object.entries(data);
      entries.forEach(key => {
        this.tournaments.push(key[1]);
      });
    });
    console.log(this.tournaments);
  }

  kingdomImageUrl: string = 'https://ansteorra.org/wp-content/themes/Ansteorra_2024/img/kingdom_shield.png';

}

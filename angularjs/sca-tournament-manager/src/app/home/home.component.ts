import { Component, OnInit } from '@angular/core';
import { GetTournamentService } from '../get-tournament.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public getTournaments: GetTournamentService) { }

  tournaments: {name: string, location: string, createdAt: string, participants:[]}[] = [];

  ngOnInit(): void {
    this.getTournaments.getTournaments().subscribe((data) =>{
      var entries = Object.entries(data);
      entries.forEach(key => {
        this.tournaments.push(key[1]);
      })
    });
  }

  kingdomImageUrl: string = 'https://ansteorra.org/wp-content/themes/Ansteorra_2024/img/kingdom_shield.png';

}

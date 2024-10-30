import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament-info',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.css'],
  
})
export class TournamentInfoComponent implements OnInit {
  kingdomImageUrl: string = 'https://ansteorra.org/wp-content/themes/Ansteorra_2024/img/kingdom_shield.png';
  title: string = 'Tournament A';
  description: string = 'Description for tournament A goes here';
  constructor() { }

  ngOnInit(): void {
    
  }
}

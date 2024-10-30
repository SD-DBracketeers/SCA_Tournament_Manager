import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament-info',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.css'],
  
})
export class TournamentInfoComponent implements OnInit {
  @Input() kingdomImageId: string = '0';
  kingdomImageUrl: string = 'https://ansteorra.org/wp-content/themes/Ansteorra_2024/img/kingdom_shield.png';
  @Input() title: string = '';
  @Input() description: string = '';
  constructor() { }

  ngOnInit(): void {
    if (this.kingdomImageId == '0') {
      this.kingdomImageUrl = 'https://ansteorra.org/wp-content/themes/Ansteorra_2024/img/kingdom_shield.png';
    } else if (this.kingdomImageId == '1') {
      this.kingdomImageUrl = 'https://ansteorra.org/wp-content/themes/Ansteorra_2024/img/kingdom_shield.png';
    } else {
      this.kingdomImageUrl = 'https://ansteorra.org/wp-content/themes/Ansteorra_2024/img/kingdom_shield.png';
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  kingdomImageUrl: string = 'https://ansteorra.org/wp-content/themes/Ansteorra_2024/img/kingdom_shield.png';

}

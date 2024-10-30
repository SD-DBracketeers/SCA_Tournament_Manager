import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-participants',
  templateUrl: './search-participants.component.html',
  styleUrls: ['./search-participants.component.css'],
})
export class SearchParticipantsComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navigate to the previous page for back arrow
  }

  searchQuery: string = ''; // Bound to the search input field

  participants = [
    {
      name: 'Guy Smith',
      rank: 'Knight',
      combatType: 'Heavy',
      expires: '9/27/24',
      kingdom: 'Ansteorra',
    },
    {
      name: 'Girl Stone',
      rank: 'MoD',
      combatType: 'Rapier',
      expires: '10/27/24',
      kingdom: 'Ansteorra',
    },
    {
      name: 'Person Miller',
      rank: 'AoA',
      combatType: 'Rapier',
      expires: '11/05/24',
      kingdom: 'Ansteorra',
    },
    {
      name: 'Guy Smith',
      rank: 'Knight',
      combatType: 'Heavy',
      expires: '9/27/24',
      kingdom: 'Ansteorra',
    },
  ];
}

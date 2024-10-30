import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GetParticipantsService } from '../get-participants.service';

@Component({
  selector: 'app-search-participants',
  templateUrl: './search-participants.component.html',
  styleUrls: ['./search-participants.component.css'],
})
export class SearchParticipantsComponent implements OnInit {
  constructor(private location: Location, public getParticipants: GetParticipantsService) {}

  goBack(): void {
    this.location.back(); // Navigate to the previous page for back arrow
  }

  searchQuery: string = ''; // Bound to the search input field

  participants = [
    {
      name: 'Guy Smith',
      rank: 'Knight',
      combatType: 'Heavy',
      verificationExperationDate: '9/27/24',
      kingdom: 'Ansteorra',
    },
    {
      name: 'Girl Stone',
      rank: 'MoD',
      combatType: 'Rapier',
      verificationExperationDate: '10/27/24',
      kingdom: 'Ansteorra',
    },
    {
      name: 'Person Miller',
      rank: 'AoA',
      combatType: 'Rapier',
      verificationExperationDate: '11/05/24',
      kingdom: 'Ansteorra',
    },
    {
      name: 'Guy Smith',
      rank: 'Knight',
      combatType: 'Heavy',
      verificationExperationDate: '9/27/24',
      kingdom: 'Ansteorra',
    },
  ];

  ngOnInit(): void {
    this.getParticipants.getParticipants().subscribe((data) =>{
      var entries = Object.entries(data);
      entries.forEach(key => {
        this.participants.push(key[1]);
      })
    });
    
  }
}

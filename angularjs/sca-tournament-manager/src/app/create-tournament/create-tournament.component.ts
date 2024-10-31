import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent {

  constructor(private router: Router) {}

  navigateToParticipants() {
    this.router.navigate(['/search-participants']);
  }

  createTournament() {
    // Logic to save the tournament information can go here
    this.router.navigate(['/bracket']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetParticipantsService } from '../get-participants.service';

@Component({
  selector: 'update-participant',
  templateUrl: './update-participant.component.html',
  styleUrls: ['./update-participant.component.css']
})
export class UpdateParticipantComponent implements OnInit {
  constructor(private router: Router, public getParticipant: GetParticipantsService) {}
  name = '';
  rank = '';
  combatType = '';
  kingdom = '';
  verificationDate: Date = new Date;
  nav = this.router.getCurrentNavigation();
  state = this.nav?.extras?.state ?? null;

  submitForm() {
    // Logic to save participant data
    this.getParticipant.updateParticipant(this.name,this.kingdom,this.combatType,this.rank,this.verificationDate,this.state?.['participant']?.['participantNanoID'] ?? null);
  }
  ngOnInit(): void {
    this.name = this.state?.['participant']?.['name'];
    this.rank = this.state?.['participant']?.['rank'];
    this.combatType = this.state?.['participant']?.['combatType'];
    this.kingdom = this.state?.['participant']?.['kingdom'];
    this.verificationDate = new Date(this.state?.['participant']?.['verificationExpirationDate']);
  }
}

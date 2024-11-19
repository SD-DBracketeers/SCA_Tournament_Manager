import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetParticipantsService } from '../get-participants.service';

@Component({
  selector: 'app-new-participant',
  templateUrl: './new-participant.component.html',
  styleUrls: ['./new-participant.component.css']
})
export class NewParticipantComponent {
  constructor(private router: Router, public getParticipant: GetParticipantsService) {}
  name: string = '';
  rank: string = '';
  combatType: string = '';
  kingdom: string = '';
  verificationDate: Date = new Date;

  submitForm() {
    // Logic to save participant data
    this.getParticipant.createParticipant(this.name,this.kingdom,this.combatType,this. rank,this.verificationDate)
    console.log('Participant Created:', {
      name: this.name,
      rank: this.rank,
      combatType: this.combatType,
      kingdom: this.kingdom,
      verificationDate: this.verificationDate
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'update-participant',
  templateUrl: './update-participant.component.html',
  styleUrls: ['./update-participant.component.css']
})
export class UpdateParticipantComponent {
  name: string = '';
  rank: string = '';
  combatType: string = '';
  kingdom: string = '';
  verificationDate: string = '';

  submitForm() {
    // Logic to save participant data
    console.log('Participant Updated:', {
      name: this.name,
      rank: this.rank,
      combatType: this.combatType,
      kingdom: this.kingdom,
      verificationDate: this.verificationDate
    });
  }
}

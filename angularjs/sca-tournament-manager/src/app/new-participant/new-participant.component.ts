import { Component } from '@angular/core';

@Component({
  selector: 'app-new-participant',
  templateUrl: './new-participant.component.html',
  styleUrls: ['./new-participant.component.css']
})
export class NewParticipantComponent {
  name: string = '';
  rank: string = '';
  combatType: string = '';
  kingdom: string = '';
  verificationDate: string = '';

  submitForm() {
    // Logic to save participant data
    console.log('Participant Created:', {
      name: this.name,
      rank: this.rank,
      combatType: this.combatType,
      kingdom: this.kingdom,
      verificationDate: this.verificationDate
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-view-participant',
  templateUrl: './view-participant.component.html',
  styleUrls: ['./view-participant.component.css'],
})
export class ViewParticipantComponent {
  name: string = 'Guy Smith';
  rank: string = 'AoA';
  combatType: string = 'Heavy';
  kingdom: string = 'Ansteorra';
  wins: number = 24;
  losses: number = 32;

  result: { tournament: string; placement: string; date: string }[] = [
    { tournament: 'Tournament A', placement: '2nd', date: '9/27/23' },
    { tournament: 'Tournament B', placement: '1st', date: '9/27/23' },
    { tournament: 'Tournament C', placement: '7th', date: '9/27/23' },
    { tournament: 'Tournament D', placement: '14th', date: '9/27/23' }
  ];
}

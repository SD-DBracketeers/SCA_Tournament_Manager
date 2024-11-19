import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetParticipantsService } from '../get-participants.service';

@Component({
  selector: 'app-bracket-block',
  templateUrl: './bracket-block.component.html',
  styleUrls: ['./bracket-block.component.css']
})
export class BracketBlockComponent implements OnInit {

  constructor(private router: Router, public getParticipantById: GetParticipantsService) {}

  //input variables
  @Input() tournamentString: string = '';
  tournament: {tournamentParticipants:string[], progression:string[]} = 
    {tournamentParticipants:[], progression:[]};
  @Input() participantIndexOne: string = '';
  indexOne: number = 0;
  @Input() participantIndexTwo: string = '';
  indexTwo: number = 0;
  @Input() round: string = '';
  @Input() totalRounds: string = '1';

  participantOne = {name: '   ', nanoID: ' '};
  participantTwo = {name: '   ', nanoID: ' '};

  // queries the database to get the nanoID and name of the participants
  getParticipant(tournament: {tournamentParticipants:string[],progression:string[]},
    index: number, round: string) {
    const newVal: {name: string, nanoID: string} = {
      name:'   ',
      nanoID:' '
    }
    // gets the participant directly from the API for the first round
    if (index < tournament.tournamentParticipants.length && round === '0') {
      const nanoID = tournament.tournamentParticipants[index];
      this.getParticipantById.getParticipantByID(nanoID).subscribe((data)=> {
        var entries = Object.entries(data);
        entries.forEach(key => {
          if (key[0] === 'name') newVal.name = key[1];
          else if (key[0] === 'participantNanoID') newVal.nanoID = key[1];
        });
      });
      return newVal;
      // gets the participants for the second round
    } else if (index < tournament.progression.length && round === '1') {
      const nanoID = tournament.progression[index];
      if (nanoID == ' ') {
        return newVal;
      }
      this.getParticipantById.getParticipantByID(nanoID).subscribe((data)=> {
        var entries = Object.entries(data);
        entries.forEach(key => {
          if (key[0] === 'name') newVal.name = key[1];
          else if (key[0] === 'participantNanoID') newVal.nanoID = key[1];
        });
      });
      return newVal;
      // gets the participants for the following rounds
    } else if (Number(round) > 1) {
      var progressIndex = 0;
      var count = 1;
      // get the index in the progression for the tournament
      while (count < Number(round)) {
        progressIndex += Math.pow(2, Number(this.totalRounds)) / Math.pow(2, count);
        count++;
      }
      progressIndex += index;
      // request for the participant information
      if (progressIndex < tournament.progression.length) {
        const nanoID = tournament.progression[progressIndex];
        if (nanoID == ' ') {
          return newVal;
        }
        this.getParticipantById.getParticipantByID(nanoID).subscribe((data)=> {
          var entries = Object.entries(data);
          entries.forEach(key => {
            if (key[0] === 'name') newVal.name = key[1];
            else if (key[0] === 'participantNanoID') newVal.nanoID = key[1];
          });
        });
      }
    }
    return newVal;
  }

  // save the selected participant
  onSelect(participant: {name: string, nanoID: string}) {
    localStorage.setItem('winner', participant.nanoID);
  }

  ngOnInit(): void {
    this.tournament = JSON.parse(this.tournamentString);
    this.indexOne = Number(this.participantIndexOne);
    this.indexTwo = Number(this.participantIndexTwo);
    this.participantOne = this.getParticipant(this.tournament, this.indexOne, this.round);
    this.participantTwo = this.getParticipant(this.tournament, this.indexTwo, this.round);
  }
}

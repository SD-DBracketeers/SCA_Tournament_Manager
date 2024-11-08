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
  @Input() tournamentString: string = '';
  tournament: {tournamentParticipants:[], progression:[]} = 
    {tournamentParticipants:[], progression:[]};
  @Input() participantIndexOne: string = '';
  indexOne: number = 0;
  @Input() participantIndexTwo: string = '';
  indexTwo: number = 0;
  @Input() round: string = '';

  participantOne = {name: '', nanoID: ''};
  participantTwo = {name: '', nanoID: ''};

  getParticipant(tournament: {tournamentParticipants:[],progression:[]},
    index: number, round: string) {
    const newVal: {name: string, nanoID: string} = {
      name:'',
      nanoID:''
    }
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
    } 
    return newVal;
  }
  ngOnInit(): void {
    this.tournament = JSON.parse(this.tournamentString);
    this.indexOne = Number(this.participantIndexOne);
    this.indexTwo = Number(this.participantIndexTwo);
    this.participantOne = this.getParticipant(this.tournament, this.indexOne, this.round);
    console.log(this.participantOne);
    this.participantTwo = this.getParticipant(this.tournament, this.indexTwo, this.round);
  }
}

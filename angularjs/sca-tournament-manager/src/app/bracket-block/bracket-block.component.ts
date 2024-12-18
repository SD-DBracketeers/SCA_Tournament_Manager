import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetParticipantsService } from '../get-participants.service';

@Component({
  selector: 'app-bracket-block',
  templateUrl: './bracket-block.component.html',
  styleUrls: ['./bracket-block.component.css'],
})
export class BracketBlockComponent implements OnInit {
  constructor(
    private router: Router,
    public getParticipantById: GetParticipantsService
  ) {}

  //input variables
  @Input() tournamentString = '';
  tournament: { tournamentParticipants: string[]; progression: string[] } = {
    tournamentParticipants: [],
    progression: [],
  };
  @Input() participantIndexOne = '';
  indexOne = 0;
  @Input() participantIndexTwo = '';
  indexTwo = 0;
  @Input() round = '';
  @Input() totalRounds = '1';

  participantOne = { name: '   ', nanoID: ' ' };
  participantTwo = { name: '   ', nanoID: ' ' };

  // queries the database to get the nanoID and name of the participants
  getParticipant(
    tournament: { tournamentParticipants: string[]; progression: string[] },
    index: number,
    round: string
  ) {
    const newVal: { name: string; nanoID: string } = {
      name: '   ',
      nanoID: ' ',
    };
    // gets the participant directly from the API for the first round
    if (index < tournament.tournamentParticipants.length && round === '0') {
      const nanoID = tournament.tournamentParticipants[index];
      this.getParticipantById.getParticipantByID(nanoID).subscribe((data) => {
        const entries = Object.entries(data);
        entries.forEach((key) => {
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
      this.getParticipantById.getParticipantByID(nanoID).subscribe((data) => {
        const entries = Object.entries(data);
        entries.forEach((key) => {
          if (key[0] === 'name') newVal.name = key[1];
          else if (key[0] === 'participantNanoID') newVal.nanoID = key[1];
        });
      });
      return newVal;
      // gets the participants for the following rounds
    } else if (Number(round) > 1) {
      let progressIndex = 0;
      let count = 1;
      // get the index in the progression for the tournament
      while (count < Number(round)) {
        progressIndex +=
          Math.pow(2, Number(this.totalRounds)) / Math.pow(2, count);
        count++;
      }
      progressIndex += index;
      // request for the participant information
      if (progressIndex < tournament.progression.length) {
        const nanoID = tournament.progression[progressIndex];
        if (nanoID == ' ') {
          return newVal;
        }
        this.getParticipantById.getParticipantByID(nanoID).subscribe((data) => {
          const entries = Object.entries(data);
          entries.forEach((key) => {
            if (key[0] === 'name') newVal.name = key[1];
            else if (key[0] === 'participantNanoID') newVal.nanoID = key[1];
          });
        });
      }
    }
    return newVal;
  }

  // save the selected participant
  onSelect(participant: { name: string; nanoID: string }) {
    localStorage.setItem('winner', participant.nanoID);

    // Clear the previously selected block's class
    document
      .querySelectorAll('.selected')
      .forEach((el) => el.classList.remove('selected'));

    // Add the 'selected' class to the dragged element
    const element = document.querySelector(
      `li.team[data-id="${participant.nanoID}"]`
    );
    if (element) {
      element.classList.add('selected');
    }
  }

  viewParticipant(nanoID: string) {
    this.router.navigate(['/view-participant'], { state: { nanoId: nanoID } });
  }

  ngOnInit(): void {
    this.tournament = JSON.parse(this.tournamentString);
    this.indexOne = Number(this.participantIndexOne);
    this.indexTwo = Number(this.participantIndexTwo);
    this.participantOne = this.getParticipant(
      this.tournament,
      this.indexOne,
      this.round
    );
    this.participantTwo = this.getParticipant(
      this.tournament,
      this.indexTwo,
      this.round
    );
  }

  // participant dragging logic
  draggedParticipant: string | null = null;

  onDragStart(event: DragEvent, participantName: string): void {
    this.draggedParticipant = participantName;
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', participantName);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const droppedName = event.dataTransfer?.getData('text/plain');
    if (droppedName && target.tagName === 'P') {
      target.textContent = droppedName;
    }
  }
}

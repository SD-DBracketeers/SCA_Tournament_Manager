import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantInformationComponent } from './participant-information.component';

describe('ParticipantInformationComponent', () => {
  let component: ParticipantInformationComponent;
  let fixture: ComponentFixture<ParticipantInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

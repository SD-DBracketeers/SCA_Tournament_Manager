import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchParticipantsComponent } from './search-participants.component';

describe('SearchParticipantsComponent', () => {
  let component: SearchParticipantsComponent;
  let fixture: ComponentFixture<SearchParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

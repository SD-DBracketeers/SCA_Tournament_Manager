import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketBlockComponent } from './bracket-block.component';

describe('BracketBlockComponent', () => {
  let component: BracketBlockComponent;
  let fixture: ComponentFixture<BracketBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BracketBlockComponent]
    });
    fixture = TestBed.createComponent(BracketBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

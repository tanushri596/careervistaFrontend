import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateExperienceComponent } from './candidate-experience.component';

describe('CandidateExperienceComponent', () => {
  let component: CandidateExperienceComponent;
  let fixture: ComponentFixture<CandidateExperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateExperienceComponent]
    });
    fixture = TestBed.createComponent(CandidateExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateJobComponent } from './candidate-job.component';

describe('CandidateJobComponent', () => {
  let component: CandidateJobComponent;
  let fixture: ComponentFixture<CandidateJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateJobComponent]
    });
    fixture = TestBed.createComponent(CandidateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

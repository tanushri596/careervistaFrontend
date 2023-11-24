import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProjectComponent } from './candidate-project.component';

describe('CandidateProjectComponent', () => {
  let component: CandidateProjectComponent;
  let fixture: ComponentFixture<CandidateProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateProjectComponent]
    });
    fixture = TestBed.createComponent(CandidateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

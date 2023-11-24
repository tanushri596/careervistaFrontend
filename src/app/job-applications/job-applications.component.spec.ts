import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationsComponent } from './job-applications.component';

describe('JobApplicationsComponent', () => {
  let component: JobApplicationsComponent;
  let fixture: ComponentFixture<JobApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobApplicationsComponent]
    });
    fixture = TestBed.createComponent(JobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

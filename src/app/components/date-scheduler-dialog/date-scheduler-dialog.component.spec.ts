import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSchedulerDialogComponent } from './date-scheduler-dialog.component';

describe('DateSchedulerDialogComponent', () => {
  let component: DateSchedulerDialogComponent;
  let fixture: ComponentFixture<DateSchedulerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateSchedulerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateSchedulerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date-scheduler-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatNativeDateModule
  ],
  templateUrl: './date-scheduler-dialog.component.html',
  styleUrl: './date-scheduler-dialog.component.css'
})
export class DateSchedulerDialogComponent {
  selectedDate: Date | null;

  constructor(
    public dialogRef: MatDialogRef<DateSchedulerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentDate: Date | null }
  ) {
    this.selectedDate = data.currentDate;
  }

  save(): void {
    this.dialogRef.close(this.selectedDate);
  }

  clearDate(): void {
    this.selectedDate = null;
    this.dialogRef.close(null);
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }

}

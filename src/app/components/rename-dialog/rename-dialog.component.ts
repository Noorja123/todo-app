import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rename-dialog',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './rename-dialog.component.html',
  styleUrl: './rename-dialog.component.css'
})

export class RenameDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RenameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newTitle: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data.newTitle);
  }
}


import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-remove-employee-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './remove-employee-dialog.component.html',
  styleUrl: './remove-employee-dialog.component.scss'
})
export class RemoveEmployeeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeName: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

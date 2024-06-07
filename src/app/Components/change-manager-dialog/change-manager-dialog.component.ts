import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../Model/employee.model';
import { EmployeeDataService } from '../../Services/employee-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-manager-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  templateUrl: './change-manager-dialog.component.html',
  styleUrls: ['./change-manager-dialog.component.scss'],
})
export class ChangeManagerDialogComponent implements OnInit {
  selectedManagerName: string = '';
  filteredManagers: Employee[] = [];
  selectedManagerId: number | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<ChangeManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private employeeService: EmployeeDataService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.employeeService.getEmployees().subscribe((employees) => {
        this.filteredManagers = employees.filter(
          (emp) => emp.id !== this.data.employeeId
        );
      })
    );
  }
  onManagerSelected(event: any): void {
    const selectedManager = this.filteredManagers.find(
      (manager) => manager.name === event.option.value
    );
    this.selectedManagerId = selectedManager ? selectedManager.id : null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.selectedManagerId !== null) {
      this.dialogRef.close(this.selectedManagerId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

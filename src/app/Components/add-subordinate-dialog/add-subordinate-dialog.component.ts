import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../Model/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeDataService } from '../../Services/employee-data.service';

@Component({
  selector: 'app-add-subordinate-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-subordinate-dialog.component.html',
  styleUrls: ['./add-subordinate-dialog.component.scss'],
})
export class AddSubordinateDialogComponent {

  newEmployee: Employee = {
    id: 0,
    name: '',
    managerId: this.data.managerId,
    imageUrl: 'https://via.placeholder.com/150',
    email: '',
    subordinates: [],
    designation: '',
  };
  formValid: boolean | null = false;

  constructor(
    public dialogRef: MatDialogRef<AddSubordinateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { managerId: number },
    private employeeDataService:EmployeeDataService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.employeeDataService.employees.forEach((emp)=>{
      if(emp.id === this.data.managerId && emp.level){
        let level = emp.level + 1
        this.newEmployee.level = level
      }
    })

    
    this.newEmployee.id = Date.now();
    this.dialogRef.close(this.newEmployee);
    console.log(this.employeeDataService.employees);
    
  }
  updateFormValidity(form: NgForm) {
    this.formValid = form.valid;
  }
}

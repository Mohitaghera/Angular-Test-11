import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeDataService } from '../../Services/employee-data.service';
import { Employee } from '../../Model/employee.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AddSubordinateDialogComponent } from '../add-subordinate-dialog/add-subordinate-dialog.component';
import { RemoveEmployeeDialogComponent } from '../remove-employee-dialog/remove-employee-dialog.component';
import { ChangeManagerDialogComponent } from '../change-manager-dialog/change-manager-dialog.component';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss',
})
export class EmployeeCardComponent {
  employees: Employee[] = [];
  @Input() employee!: Employee;
  @Output() cardClick = new EventEmitter<void>();

  constructor(
    public employeeService: EmployeeDataService,
    private dialog: MatDialog
  ) {
    this.employees = employeeService.employees;
  }

  onCardClick() {  
    if (this.employee.managerId !== null) {
      this.cardClick.emit();
    }
  }
  getSubordinates() {
    const manager = this.employees.find((emp) => emp.id === this.employee.id);
    return manager ? this.employeeService.getSubordinates(manager.id) : [];
  }

  addSubordinate(event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddSubordinateDialogComponent, {
      width: '300px',
      data: { managerId: this.employee.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.addSubordinate(this.employee.id, result);
      }
    });
  }

  removeEmployee(event: Event) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(RemoveEmployeeDialogComponent, {
      width: '300px',
      data: { employeeName: this.employee.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.removeEmployee(this.employee.id);
      }
    });
  }

  changeManager(event: Event) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ChangeManagerDialogComponent, {
      width: '300px',
      data: { employeeId: this.employee.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.changeManager(this.employee.id, result);
      }
    });
  }

  clickAction(event: Event) {
    event.stopPropagation();
  }
}

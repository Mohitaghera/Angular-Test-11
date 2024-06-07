import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EmployeeDataService } from '../../Services/employee-data.service';
import { Employee } from '../../Model/employee.model';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [MatCardModule, EmployeeCardComponent, CommonModule],
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss'],
})
export class HierarchyComponent implements OnInit {
  employees: Employee[] = [];
  data: Employee[] = [];
  private subscription: Subscription = new Subscription();

  constructor(public employeeDataService: EmployeeDataService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.employeeDataService.getEmployees().subscribe((employees) => {
        this.employees = employees;
        this.data = this.createOrganizationChartData();
        
      })
    );
  }

  toggleNode(node: any) {
    if (!node.expanded) {
      this.employeeDataService.employees.forEach((emp) => {
        if (emp.level === node.level) {
          const indexes = this.employeeDataService.employees
            .map((employee, index) => ({ employee, index }))
            .filter(({ employee }) => employee.level === node.level)
            .map(({ index }) => index);

          indexes.forEach((i) => {            
            this.employeeDataService.employees[i].expanded = false;              
                      
          });
        }
      });
    }else{
      this.employeeDataService.employees.forEach((emp) => {
        if (emp.level === node.level && emp.id !== node.id) {
          emp.expanded = false;
        }
      });
    }

    if (node.managerId !== null) {
      node.expanded = !node.expanded;

      this.employeeDataService.employees.forEach((emp) => {
        if (emp.id === node.id) {
          const index = this.employeeDataService.employees.findIndex(
            (employee) => {
              return employee.id === node.id;
            }
          );
          this.employeeDataService.employees[index] = node;
        }
      });
    }
    this.data = this.createOrganizationChartData();

  }

  createOrganizationChartData(): Employee[] {  
    const root = this.employeeDataService.employees.find((emp) => emp.managerId === null);
    if (root) {
      return [this.createTreeNode(root, true)];
    }
    return [];
  }

  createTreeNode(employee: Employee, expanded: boolean = false): Employee {    
    return {
      ...employee,
      expanded: expanded,
      children: this.getSubordinates(employee.id).map((subordinate) =>
        this.createTreeNode(subordinate, subordinate.expanded)
      ),
    };
  }

  getSubordinates(managerId: number): Employee[] {
    return this.employeeDataService.employees.filter(
      (employee) => employee.managerId === managerId
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

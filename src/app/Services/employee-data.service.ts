import { Injectable } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { BehaviorSubject, expand } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      managerId: null,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'john.doe@example.com',
      subordinates: [2, 3],
      designation: 'CEO',
      expanded: true,
      level:1,
    },
    {
      id: 2,
      name: 'Jane Smith',
      managerId: 1,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'jane.smith@example.com',
      subordinates: [4, 5],
      designation: 'CTO',
      expanded: false,
      level:2,

    },
    {
      id: 3,
      name: 'Bob Johnson',
      managerId: 1,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'bob.johnson@example.com',
      subordinates: [6],
      designation: 'CFO',
      expanded: false,
      level:2,
    },
    {
      id: 4,
      name: 'Alice Brown',
      managerId: 2,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'alice.brown@example.com',
      subordinates: [8, 9],
      designation: 'Engineering Manager',
      expanded: false,
      level:3,
    },
    {
      id: 5,
      name: 'Charlie White',
      managerId: 2,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'charlie.white@example.com',
      subordinates: [10, 11],
      designation: 'Product Manager',
      expanded: false,
      level:3,
    },
    {
      id: 6,
      name: 'David Black',
      managerId: 3,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'david.black@example.com',
      subordinates: [7, 12],
      designation: 'Finance Manager',
      expanded: false,
      level:3,
    },
    {
      id: 7,
      name: 'Eva Green',
      managerId: 6,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'eva.green@example.com',
      subordinates: [],
      designation: 'Accountant',
      expanded: false,
      level:4,
    },
    {
      id: 8,
      name: 'Niva Green',
      managerId: 4,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'niva.green@example.com',
      subordinates: [],
      designation: 'Accountant',
      expanded: false,
      level:4,
    },
    {
      id: 9,
      name: 'John',
      managerId: 4,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'john.green@example.com',
      subordinates: [],
      designation: 'Accountant',
      expanded: false,
      level:4,
    },
    {
      id: 10,
      name: 'Lila',
      managerId: 5,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'lila.green@example.com',
      subordinates: [],
      designation: 'Accountant',
      expanded: false,
      level:4,
    },
    {
      id: 11,
      name: 'Kavi',
      managerId: 5,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'kavi.green@example.com',
      subordinates: [],
      designation: 'Accountant',
      expanded: false,
      level:4,
    },
    {
      id: 12,
      name: 'Jack',
      managerId: 6,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'jack.green@example.com',
      subordinates: [],
      designation: 'Accountant',
      expanded: false,
      level:4,
    },
  ];
  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);

  getEmployees() {
    return this.employeesSubject.asObservable();
  }

  getSubordinates(managerId: number): Employee[] {
    const manager = this.employees.find((emp) => emp.id === managerId);
    if (manager && manager.subordinates) {
      return this.employees.filter((emp) =>
        manager.subordinates?.includes(emp.id)
      );
    }
    return [];
  }

  addSubordinate(managerId: number, employee: Employee) {    
    const manager = this.employees.find((emp) => emp.id === managerId);
    if (manager) {
      manager.subordinates = manager.subordinates ?? [];
      if (manager.subordinates.length < 5) {

        this.employees.push(employee);
        manager.subordinates.push(employee.id);
        this.employeesSubject.next([...this.employees]);
      } else {
        alert('Maximum limit of 5 subordinates reached.');
      }
    }
  }

  removeEmployee(employeeId: number) {
    const employeeIndex = this.employees.findIndex(
      (emp) => emp.id === employeeId
    );
    if (
      employeeIndex > -1 &&
      (!this.employees[employeeIndex].subordinates ||
        this.employees[employeeIndex].subordinates?.length === 0)
    ) {
      this.employees.splice(employeeIndex, 1);

      this.employees.forEach((manager) => {
        if (manager.subordinates && manager.subordinates.includes(employeeId)) {
          manager.subordinates = manager.subordinates.filter(
            (id) => id !== employeeId
          );
        }
      });
      this.employeesSubject.next([...this.employees]);
    }
  }

  changeManager(employeeId: number, newManagerId: number) {
    const employee = this.employees.find((emp) => emp.id === employeeId);
    const oldManager = this.employees.find(
      (emp) => emp.id === employee?.managerId
    );
    const newManager = this.employees.find((emp) => emp.id === newManagerId);

    if (employee && oldManager && newManager) {
      oldManager.subordinates =
        oldManager.subordinates?.filter((id) => id !== employeeId) || [];
      newManager.subordinates = newManager.subordinates || [];
      newManager.subordinates.push(employeeId);
      employee.managerId = newManagerId;
      this.employeesSubject.next([...this.employees]);
    }
  }
}

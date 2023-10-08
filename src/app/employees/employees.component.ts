import { Component } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Employee} from "../models/Employee.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../services/Employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  employees !: Observable<Array<Employee>>;
  errorMessage!: string;
  searchFormGroup : FormGroup | undefined;
  constructor(private employeeService:EmployeeService,private formBuilder:FormBuilder,
              private router:Router) {}

  ngOnInit(){
    this.employees=this.employeeService.getEmployee(1,6).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
}

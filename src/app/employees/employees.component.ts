import {Component} from '@angular/core';
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
  currentPage : number =1;
  pageSize : number =5;
  pageNumbers: number[] = [];

  constructor(private employeeService:EmployeeService,private formBuilder:FormBuilder,
              private router:Router) {}

  ngOnInit(){
    this.employees=this.employeeService.getEmployee(this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.numberOfpages();
  }

  handleEditeEmployee(e: Employee) {

  }

  openEditEmployeeModel() {
    let modelDev=document.getElementById('myModal');
    if (modelDev != null){
      modelDev.style.display='block';
    }
  }

  closeEditEmployeeModel() {
    let modelDev=document.getElementById('myModal');
    if (modelDev != null){
      modelDev.style.display='none';
    }
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.employees=this.employeeService.getEmployee(page,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  numberOfpages() {
    this.employeeService.countEmployees().subscribe((totalEmployees: number) => {
      const totalPages = Math.ceil(totalEmployees / this.pageSize);
      this.pageNumbers = Array.from({ length: totalPages }, (_, index) => index+1);
    });
  }



}

import {Component, ViewChild} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Employee} from "../models/Employee.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../services/Employee.service";
import {Router} from "@angular/router";
import {Month} from "../models/Month.model";
import {MonthService} from "../services/month.service";
import {MatDialog} from "@angular/material/dialog";
import {SaveEmplyeeModalComponent} from "./save-emplyee-modal/save-emplyee-modal.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UpdateEmplyeeComponent} from "./update-emplyee/update-emplyee.component";
import {UpdateMonthComponent} from "./update-month/update-month.component";


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  displayedColumns: string[] = [
    'employerId','name', 'lastName','months','constructionSiteDto','salary', 'homeAddress'
    , 'phone', 'action'
    ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  employees !: Observable<Array<Employee>>;
  errorMessage!: string;
  currentPage : number =1;
  pageSize : number =5;
  pageNumbers: number[] = [];

  constructor(private employeeService:EmployeeService
                ,private formBuilder:FormBuilder
                ,private router:Router
                ,private _dialog:MatDialog) {}

  openSaveEmployeeModal(){
    this._dialog.open(SaveEmplyeeModalComponent);
  }

  ngOnInit(){
    this.getEmployeesList();
    this.getEmployeesPages();
    this.numberOfpages();
  }

  getEmployeesPages(){
    this.employees = this.employeeService.getEmployees(this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      }),
      map(employees => {
        // Sort the months within each employee in descending order (most recent to oldest)
        return employees.map(employee => ({
          ...employee,
          months: employee.months.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }));
      })
    );
  }

// ...

getEmployeesList() {
  this.employeeService.getAllEmployeesList().pipe(
      map((employees) => {
        // Sort the months within each employee in descending order (most recent to oldest)
        return employees.map((employee) => ({
          ...employee,
          months: employee.months.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }));
      })
  ).subscribe({
    next: (res) => {
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error: (err) => {
      this.errorMessage = err.message;
    },
  });
}


openEditEmployeeModel(data:any) {
    this._dialog.open(UpdateEmplyeeComponent,{
      data,
    })
  }

  closeEditEmployeeModel() {
    let modelDev=document.getElementById('myModal');
    if (modelDev != null){
      modelDev.style.display='none';
    }
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.employees=this.employeeService.getEmployees(page,this.pageSize).pipe(
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



  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  deleteEmployee(id:number){
    console.log(id)
    this.employeeService.deleteEMployee(id).subscribe({
      next:(value)=>{
        this.getEmployeesList();
        //TODO:open message to confirme deletion
      },
      error: (err)=> throwError(err)
    })
  }

  openUpdateMonthModal(data:any) {
    this._dialog.open(UpdateMonthComponent,{
      data,
    })
  }
}

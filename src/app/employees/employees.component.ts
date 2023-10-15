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
import {MonthsComponent} from "./months/months.component";
import {DeleteComponent} from "./delete/delete.component";


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

  constructor(private employeeService:EmployeeService
                ,private formBuilder:FormBuilder
                ,private router:Router
                ,private _dialog:MatDialog) {}

  openSaveEmployeeModal(){
    const dialogRef=this._dialog.open(SaveEmplyeeModalComponent);
    dialogRef.afterClosed().subscribe({
      next:(value)=>{
          this.getEmployeesList();
      }
    })
  }

  ngOnInit(){
    this.getEmployeesList();
  }



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
    const dialogRef=this._dialog.open(UpdateEmplyeeComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(value)=>{
          this.getEmployeesList();
      }
    })
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  deleteEmployee(data:any){
    const dialogRef=this._dialog.open(DeleteComponent,{
      data,
    })
    dialogRef.afterClosed().subscribe({
      next:(value)=>{
        this.getEmployeesList();
      }
    })
  }

  openUpdateMonthModal(data:any) {
    this._dialog.open(UpdateMonthComponent,{
      data,
    })
  }

  openMonthDetials(data:any) {
    this._dialog.open(MonthsComponent,{
      data,
    })
  }
}

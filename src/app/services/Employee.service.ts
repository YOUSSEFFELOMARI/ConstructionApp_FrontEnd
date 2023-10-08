import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/Employee.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  public getEmployee(pageNum:number,pageSize:number):Observable<Array<Employee>>{
    return this.http.get<Array<Employee>>(environment.backendHost+`/Employees/page/${pageNum}?pageSize=${pageSize}`);
  }

  public displayAllEmployeeDetail(id: number):Observable<Employee>{
    return this.http.get<Employee>(environment.backendHost+`/Employees/${id}`);
  }

  public saveEmployee(emplyee:Employee):Observable<Employee>{
    return this.http.post<Employee>(environment.backendHost+`/Employees`,emplyee);
  }

  public updateEmployee(employee:Employee):Observable<Employee>{
    return this.http.put<Employee>(environment.backendHost+`/Employees`,employee);
  }

  public deleteEMployee(id: number){
    return this.http.delete(environment.backendHost+`/Employees`)
  }

  public countEmployees():any{
    return this.http.get(environment.backendHost+`/Employees/count`)
  }
}

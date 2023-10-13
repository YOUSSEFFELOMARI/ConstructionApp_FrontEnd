import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Employee} from "../models/Employee.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  public getEmployees(pageNum:number,pageSize:number):Observable<Array<Employee>>{
    return this.http.get<Array<Employee>>(environment.backendHost+`/Employees/page/${pageNum}?pageSize=${pageSize}`);
  }

  public getAllEmployeesList():Observable<Array<Employee>>{
    return this.http.get<Array<Employee>>(environment.backendHost+`/Employees/page`);
  }

  public displayAllEmployeeDetail(id: number):Observable<Employee>{
    return this.http.get<Employee>(environment.backendHost+`/Employees/${id}`);
  }

  public saveEmployee(emplyee: { lastName: any; months: void | undefined; phone: any; name: any; constructionSiteDto: { address: any | undefined; endDate: any | undefined; name: any | undefined; startDate: any | undefined} | undefined; salary: any; homeAddress: any }):Observable<Employee>{
    return this.http.post<Employee>(environment.backendHost+`/Employees`,emplyee);
  }

  public updateEmployee(employee: { employerId: any; lastName: any; months: void | undefined; phone: any; name: any; constructionSiteDto: { name: any; startDate: any; endDate: any; address: any } | undefined; salary: any; homeAddress: any }):Observable<Employee>{
    return this.http.put<Employee>(environment.backendHost+`/Employees`,employee);
  }

  public deleteEMployee(id: number){
    return this.http.delete(environment.backendHost+`/Employees/${id}`)
  }

  public countEmployees():Observable<number>{
    return this.http.get<any>(environment.backendHost + '/Employees/count')
      .pipe(
        map((response: any) => {
          // API returns the count as a number, need to parse it
          return parseInt(response, 10);
        })
      );
  }
}

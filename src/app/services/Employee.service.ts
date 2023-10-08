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

  public countEmployees():Observable<number>{
    return this.http.get<any>(environment.backendHost + '/Employees/count')
      .pipe(
        map((response: any) => {
          // Assuming your API returns the count as a number, you may need to parse it if it's a string
          return parseInt(response, 10);
        })
      );
  }
}

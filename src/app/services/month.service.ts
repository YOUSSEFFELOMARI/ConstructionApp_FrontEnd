import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Month} from "../models/Month.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  constructor(private http:HttpClient) { }

  public getMonths(pageNum:number,pageSize:number):Observable<Array<Month>>{
    return this.http.get<Array<Month>>(environment.backendHost+`/Months/page/${pageNum}?pageSize=${pageSize}`);
  }

  public displayMonthsDetail(id: number):Observable<Month>{
    return this.http.get<Month>(environment.backendHost+`/Months/${id}`);
  }

  public saveMonth(month:any):Observable<Month>{
    return this.http.post<Month>(environment.backendHost+`/Months`,month);
  }

  public updateMonth(month:Month):Observable<Month>{
    return this.http.put<Month>(environment.backendHost+`/Months`,month);
  }

  public deleteMonth(id: number){
    return this.http.delete(environment.backendHost+`/Months`)
  }

  public countMonths():Observable<number>{
    return this.http.get<any>(environment.backendHost + '/Months/count')
        .pipe(
            map((response: any) => {
              // API returns the count as a number, need to parse it
              return parseInt(response, 10);
            })
        );
  }
}

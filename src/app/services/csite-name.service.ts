import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {CSiteNameModel} from "../models/CSiteName.model";

@Injectable({
  providedIn: 'root'
})
export class CSiteNameService {

  constructor(private http:HttpClient) { }

  public getCsitesPage(pageNum:number,pageSize:number):Observable<Array<CSiteNameModel>>{
    return this.http.get<Array<CSiteNameModel>>(environment.backendHost+`/ConstructionSiteName/page/${pageNum}?pageSize=${pageSize}`);
  }

  public getAllCSiteNameList():Observable<Array<CSiteNameModel>>{
    return this.http.get<Array<CSiteNameModel>>(environment.backendHost+`/ConstructionSiteName/page`);
  }

  public displayAllCSiteName(id: number):Observable<CSiteNameModel>{
    return this.http.get<CSiteNameModel>(environment.backendHost+`/ConstructionSiteName/${id}`);
  }

  public saveCSiteName(cSiteName: CSiteNameModel | undefined):Observable<CSiteNameModel>{
    return this.http.post<CSiteNameModel>(environment.backendHost+`/ConstructionSiteName`,cSiteName);
  }

  public updateCSiteName(cSiteName: CSiteNameModel | undefined):Observable<CSiteNameModel>{
    return this.http.put<CSiteNameModel>(environment.backendHost+`/ConstructionSiteName`,cSiteName);
  }

  public deleteCSite(id: number){
    return this.http.delete(environment.backendHost+`/ConstructionSiteName/${id}`)
  }

  public countCSite():Observable<number>{
    return this.http.get<any>(environment.backendHost + '/ConstructionSiteName/count')
      .pipe(
        map((response: any) => {
          // API returns the count as a number, need to parse it
          return parseInt(response, 10);
        })
      );
  }
}

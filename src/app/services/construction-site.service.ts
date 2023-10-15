import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ConstructionSiteDto} from "../models/ConstructionSite.model";

@Injectable({
  providedIn: 'root'
})
export class ConstructionSiteService {

  constructor(private http:HttpClient) { }

  public getCsites(pageNum:number,pageSize:number):Observable<Array<ConstructionSiteDto>>{
    return this.http.get<Array<ConstructionSiteDto>>(environment.backendHost+`/ConstructionSites/page/${pageNum}?pageSize=${pageSize}`);
  }

  public getAllCSiteList():Observable<Array<ConstructionSiteDto>>{
    return this.http.get<Array<ConstructionSiteDto>>(environment.backendHost+`/ConstructionSites/page`);
  }

  public displayAllCSiteDetail(id: number):Observable<ConstructionSiteDto>{
    return this.http.get<ConstructionSiteDto>(environment.backendHost+`/ConstructionSites/${id}`);
  }

  public saveCSite(constructionSite: ConstructionSiteDto ):Observable<ConstructionSiteDto>{
    return this.http.post<ConstructionSiteDto>(environment.backendHost+`/ConstructionSites`,constructionSite);
  }

  public updateCSite(constructionSite: ConstructionSiteDto | undefined):Observable<ConstructionSiteDto>{
    return this.http.put<ConstructionSiteDto>(environment.backendHost+`/ConstructionSites`,constructionSite);
  }

  public deleteCSite(id: number){
    return this.http.delete(environment.backendHost+`/ConstructionSites/${id}`)
  }

  public countCSite():Observable<number>{
    return this.http.get<any>(environment.backendHost + '/ConstructionSites/count')
        .pipe(
            map((response: any) => {
              // API returns the count as a number, need to parse it
              return parseInt(response, 10);
            })
        );
  }
}
